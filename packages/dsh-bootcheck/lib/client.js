window.__ModuleLoader__.load({
	id: "dsh-bootcheck",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		var react = require("react");

		// 技能速查词典已收录名（与 dsh-skill-cheatsheet 保持一致）
		var KNOWN = ["cocoloop","find-skills","grilling","libtv-cli","memory-hygiene","openclaw-mem","excel-xlsx","word-docx","wps-office-suite","tavily-search-pro","cordis-plugin-development","editing-cordis-compositions","vision-skills"];

		var css = ".bch-layer{position:fixed;inset:0;z-index:0;background:transparent}.bch-card{position:fixed;left:50%;top:80px;transform:translateX(-50%);z-index:1;width:min(520px,92vw);border-radius:14px;background:var(--dsw-alias-bg-overlay,#20242c);background:color-mix(in srgb,var(--dsw-alias-bg-overlay,#20242c) 94%,transparent);backdrop-filter:blur(18px);border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.14));box-shadow:var(--dsw-shadow-lv3,0 18px 60px rgba(0,0,0,.35));color:var(--dsw-alias-label-primary,#eceef1);overflow:hidden}.bch-head{display:flex;align-items:center;gap:8px;padding:12px 16px;font-weight:600;font-size:14px;border-bottom:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.12))}.bch-close{margin-left:auto;border:none;background:transparent;color:inherit;opacity:.7;font-size:15px;cursor:pointer;padding:2px 8px;border-radius:6px}.bch-close:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.16))}.bch-body{padding:14px 16px;font-size:12.5px;line-height:1.6;display:flex;flex-direction:column;gap:8px}.bch-warn{display:flex;gap:8px;align-items:flex-start}.bch-dot{flex:none;margin-top:4px;width:8px;height:8px;border-radius:999px;background:var(--dsw-alias-state-warn-primary,#e0a33c)}.bch-summary{font-size:11.5px;opacity:.65;border-top:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.1));padding-top:8px}";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=\"dsh-bootcheck/main\"]") === null) {
			var styleTag = document.createElement("style");
			styleTag.dataset.plugin = "dsh-bootcheck";
			styleTag.dataset.pluginCss = "dsh-bootcheck/main";
			styleTag.textContent = css;
			document.head.appendChild(styleTag);
		}

		var state = {
			checkedFor: null,
			issues: [],
			checkedCount: 0,
			open: false,
			note: ""
		};
		var listeners = new Set();
		function emit() { listeners.forEach(function (fn) { fn(); }); }
		function useSnapshot() {
			var pair = react.useState(0);
			react.useEffect(function () {
				var fn = function () { pair[1](function (n) { return n + 1; }); };
				listeners.add(fn);
				return function () { listeners.delete(fn); };
			}, []);
			return state;
		}

		function runCheck(ctx, sessionId) {
			if (!sessionId || state.checkedFor === sessionId) return;
			state.checkedFor = sessionId;
			var conn = ctx.get("connection");
			if (!conn || !conn.api || !conn.api.skills) {
				state.checkedFor = null;
				state.note = "connection.skills api 不可用";
				emit();
				return;
			}
			var ac = new AbortController();
			conn.api.skills.list({ sessionId: sessionId }, ac.signal).then(function (res) {
				var value = (res && res.result && res.result.value) ? res.result.value : {};
				var list = Array.isArray(value.skills) ? value.skills : [];
				state.checkedCount = list.length;
				var missed = list.map(function (s) { return String(s.name || ""); }).filter(function (n) { return n && KNOWN.indexOf(n) < 0; });
				state.issues = missed.length > 0 ? [{ text: missed.join("、") + " 尚未加入技能速查词典" }] : [];
				state.note = "";
				if (state.issues.length > 0) state.open = true;
				emit();
			}).catch(function () {
				state.checkedFor = null;
				state.note = "体检加载失败";
				emit();
			});
		}

		function close() {
			if (state.open) { state.open = false; emit(); }
		}

		function BootCard() {
			useSnapshot();
			if (!state.open) return null;
			return react.createElement(react.Fragment, null,
				react.createElement("div", { className: "bch-layer", onClick: close }),
				react.createElement("div", { className: "bch-card", onClick: function (e) { e.stopPropagation(); } },
					react.createElement("div", { className: "bch-head" },
						"🔍 环境体检报告",
						react.createElement("button", { className: "bch-close", onClick: close, "aria-label": "关闭" }, "✕")
					),
					react.createElement("div", { className: "bch-body" },
						state.issues.map(function (i, k) {
							return react.createElement("div", { className: "bch-warn", key: k },
								react.createElement("span", { className: "bch-dot" }),
								react.createElement("span", null, i.text)
							);
						}),
						state.note ? react.createElement("div", null, state.note) : null,
						state.checkedCount > 0 && state.issues.length > 0
							? react.createElement("div", { className: "bch-summary" }, "已检查 " + state.checkedCount + " 个技能")
							: null
					)
				)
			);
		}

		function BootProbe(props) {
			var ctx = BootProbe.ctx;
			var sessionId = props && props.sessionId;
			react.useEffect(function () {
				if (ctx && sessionId) runCheck(ctx, sessionId);
			}, [sessionId]);
			return react.createElement(BootCard, null);
		}

		function apply(ctx) {
			BootProbe.ctx = ctx;
			var slots = ctx.get("slots");
			if (!slots) return;
			slots.inject("conversation.input.overlay", function () {
				return slots.register({ name: "conversation.input.overlay", id: "bootcheck-probe" }, function (props) {
					return react.createElement(BootProbe, props);
				});
			});
		}

		exports.apply = apply;
		exports.inject = ["slots", "connection"];
		return module.exports;
	}
});
