window.__ModuleLoader__.load({
	id: "dsh-skill-cheatsheet",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		var react = require("react");

		// 内置词典：技能英文名 → 中文展示（title/purpose/examples/source）
		var DICT = {
			"cocoloop": { title: "cocoloop · 技能管理器", purpose: "安装/更新/卸载/管理 Skills：支持按名称、URL、GitHub 搜索安装，带 BSS 安全认证。", source: "用户级安装", examples: ["安装 xx 技能并告诉我怎么用", "帮我更新所有技能到最新版"] },
			"find-skills": { title: "find-skills · 技能搜索", purpose: "从 OpenClaw 等来源搜索、发现可安装的技能。", source: "用户级安装", examples: ["找找有没有做 PDF 处理的技能"] },
			"grilling": { title: "grilling · 追问打磨", purpose: "用一连串尖锐追问帮你压测方案/决策/想法，想清楚再动手。", source: "用户级安装", examples: ["帮我 grill 一下这个工作方案", "追问我的这个决定有没有漏洞"] },
			"libtv-cli": { title: "libtv-cli · LibTV 视频工具", purpose: "官方 CLI：操作 LibTV 画布/项目/节点/模型/素材（视频制作唯一入口）。", source: "用户级安装", examples: ["用 libtv 新建画布/导入素材/生成分镜"] },
			"memory-hygiene": { title: "memory-hygiene · 记忆库清理", purpose: "审计/清理/优化向量记忆库，降低无关召回与 token 消耗。", source: "用户级安装", examples: ["清理一下记忆库里的垃圾条目"] },
			"openclaw-mem": { title: "openclaw-mem · 记忆系统管理", purpose: "管理/排查 OpenClaw 记忆系统：MEMORY.md、每日日志、检索调优、上下文问题。", source: "用户级安装", examples: ["检查为什么代理忘了之前的事"] },
			"excel-xlsx": { title: "excel-xlsx · Excel 表格", purpose: "创建/检查/编辑 Excel 工作簿：公式、日期、格式、透视表、模板保留、重算。", source: "用户级安装", examples: ["把这份 xlsx 加个求和公式", "给表格做数据透视并保持格式"] },
			"word-docx": { title: "word-docx · Word 文档", purpose: "创建/检查/编辑 Word 文档：样式、编号、修订、表格、分节、兼容性检查。", source: "用户级安装", examples: ["生成一份带标题样式的 docx", "给文档加表格并保持修订记录"] },
			"wps-office-suite": { title: "wps-office-suite · WPS 办公全家桶", purpose: "四引擎（WPS/MS Office/LibreOffice/纯 Python）处理 Word/Excel/PPT：生成、分析、翻译、排版、会议纪要等。", source: "用户级安装", examples: ["把表格数据做成图表", "将这份 Word 转成 PPT"] },
			"tavily-search-pro": { title: "tavily-search-pro · Tavily 联网搜索", purpose: "AI 联网搜索/抓取：网页/新闻/财经搜索、抓取 URL 正文、爬整站、站点地图、深度研究带引用。", source: "BSS 官方源", examples: ["用 tavily 搜一下 DeepSeek 最新发布的模型", "查最近一周的 AI 行业新闻", "把这篇网页内容提取出来 https://xxx", "深度研究一下电动车市场趋势，带引用"] },
			"cordis-plugin-development": { title: "cordis-plugin-development · 插件开发", purpose: "创建/调试/修复动态 Cordis 插件（Host/Client UI、动态工具、插槽 UI）。", source: "部署自带", examples: ["写一个动态插件在输入框加个按钮"] },
			"editing-cordis-compositions": { title: "editing-cordis-compositions · 组合配置", purpose: "编写/校验 agent 预设与 Cordis 组合配置（cordis.yml、preset 挂载）。", source: "部署自带", examples: ["检查我这个 preset 为什么没挂载成功"] },
			"vision-skills": { title: "vision-skills · 视觉处理", purpose: "截图还原 UI、图片问答、长截图 OCR、元素定位、裁剪、取色、SVG 描摹。", source: "视觉插件提供", examples: ["把这张截图还原成网页", "这个图片里写了什么文字"] }
		};

		var css = ".skc-trigger{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;padding:0;border:none;border-radius:6px;background:transparent;font-size:15px;line-height:1;cursor:pointer}.skc-trigger:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.16))}.skc-layer{position:fixed;inset:0;z-index:0;background:transparent}.skc-panel{position:fixed;left:50%;bottom:148px;transform:translateX(-50%);z-index:1;width:min(640px,92vw);max-height:56vh;overflow:hidden;border-radius:14px;display:flex;flex-direction:column;background:var(--dsw-alias-bg-overlay,#20242c);background:color-mix(in srgb,var(--dsw-alias-bg-overlay,#20242c) 92%,transparent);backdrop-filter:blur(22px) saturate(1.25);border:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.14));box-shadow:var(--dsw-shadow-lv3,0 18px 60px rgba(0,0,0,.35));color:var(--dsw-alias-label-primary,#eceef1)}.skc-head{flex:none;display:flex;align-items:center;gap:8px;padding:12px 16px;font-weight:600;font-size:14px;border-bottom:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.12))}.skc-close{margin-left:auto;border:none;background:transparent;color:inherit;opacity:.7;font-size:15px;cursor:pointer;padding:2px 8px;border-radius:6px}.skc-close:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.18))}.skc-body{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:6px 0}.skc-group{padding:10px 16px 4px;font-size:12px;color:var(--dsw-alias-label-secondary,inherit);opacity:.8}.skc-item{display:flex;gap:10px;padding:9px 12px;align-items:flex-start;border-radius:8px}.skc-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.14))}.skc-icon{flex:none;width:26px;height:26px;border-radius:8px;background:color-mix(in srgb,var(--dsw-alias-brand-primary,#7a86ff) 20%,transparent);color:var(--dsw-alias-brand-text,#aab4ff);display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:600}.skc-main{flex:1;min-width:0}.skc-name{font-weight:600;font-size:13.5px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}.skc-tag{font-size:11px;font-weight:400;border-radius:999px;padding:1px 8px;color:var(--dsw-alias-brand-text,#9db4ff);background:color-mix(in srgb,var(--dsw-alias-brand-primary,#7a86ff) 18%,transparent)}.skc-tag-new{color:#f0b04a;background:color-mix(in srgb,#f0b04a 18%,transparent)}.skc-desc{font-size:12.5px;margin-top:3px;color:var(--dsw-alias-label-secondary,inherit);opacity:.92;line-height:1.55}.skc-ex{font-size:11.5px;margin-top:4px;color:var(--dsw-alias-brand-text,#aab4ff);opacity:.9;line-height:1.6}.skc-src{font-size:11px;margin-top:4px;color:var(--dsw-alias-label-tertiary,inherit);opacity:.75}.skc-empty{padding:28px 16px;text-align:center;opacity:.75;font-size:13px}.skc-foot{flex:none;padding:8px 16px;font-size:11.5px;color:var(--dsw-alias-label-tertiary,inherit);border-top:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.12))}";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=\"dsh-skill-cheatsheet/main\"]") === null) {
			var styleTag = document.createElement("style");
			styleTag.dataset.plugin = "dsh-skill-cheatsheet";
			styleTag.dataset.pluginCss = "dsh-skill-cheatsheet/main";
			styleTag.textContent = css;
			document.head.appendChild(styleTag);
		}

		var listeners = new Set();
		var store = {
			open: false,
			skills: [],
			loading: false,
			note: "",
			loadedSession: null,
			subscribe: function (fn) { listeners.add(fn); return function () { listeners.delete(fn); }; },
			emit: function () { listeners.forEach(function (fn) { fn(); }); },
			toggle: function () { store.open = !store.open; store.emit(); },
			close: function () { if (store.open) { store.open = false; store.emit(); } }
		};

		function useStoreOpen() {
			var pair = react.useState(store.open);
			react.useEffect(function () { return store.subscribe(function () { pair[1](store.open); }); }, []);
			return pair[0];
		}

		function loadSkills(ctx, sessionId) {
			if (!sessionId || store.loading) return;
			if (store.loadedSession === sessionId && store.skills.length > 0) return;
			store.loading = true;
			store.loadedSession = sessionId;
			store.emit();
			var conn = ctx.get("connection");
			if (!conn || !conn.api || !conn.api.skills) {
				store.loading = false;
				store.note = "connection.skills api 不可用";
				store.emit();
				return;
			}
			var ac = new AbortController();
			conn.api.skills.list({ sessionId: sessionId }, ac.signal).then(function (res) {
				store.loading = false;
				var value = (res && res.result && res.result.value) ? res.result.value : {};
				var list = Array.isArray(value.skills) ? value.skills : [];
				store.skills = list.map(function (s) {
					var name = String(s.name || "");
					var meta = DICT[name];
					return {
						name: name,
						title: meta ? meta.title : name,
						purpose: meta ? meta.purpose : (s.description || "（暂无中文说明，可让代理补充收录）"),
						examples: meta ? meta.examples : [],
						source: meta ? meta.source : "未收录（新安装）",
						isNew: !meta
					};
				});
				store.note = store.skills.length === 0 ? "当前会话没有可用技能" : "";
				store.emit();
			}).catch(function (err) {
				store.loading = false;
				store.note = "技能加载失败: " + (err && err.message ? err.message : String(err));
				store.emit();
			});
		}

		function Trigger(props) {
			var open = useStoreOpen();
			if (props && props.sessionId) loadSkills(props.ctx, props.sessionId);
			return react.createElement("button", {
				className: "skc-trigger",
				title: open ? "收起技能速查" : "技能速查：点开看当前有哪些技能及其用途",
				"aria-label": "技能速查",
				onClick: function () { store.toggle(); }
			}, "🧩");
		}

		function SkillList() {
			var groups = [];
			if (store.loading) {
				groups.push(react.createElement("div", { className: "skc-empty", key: "l" }, "加载中…"));
			} else if (store.skills.length === 0) {
				groups.push(react.createElement("div", { className: "skc-empty", key: "e" }, store.note || "暂无技能数据"));
			} else {
				var news = store.skills.filter(function (s) { return s.isNew; });
				var knowns = store.skills.filter(function (s) { return !s.isNew; });
				if (news.length) {
					groups.push(react.createElement("div", { className: "skc-group", key: "g0" }, "🆕 新技能·待收录"));
					news.forEach(function (s) { groups.push(row(s, true)); });
				}
				if (knowns.length) {
					groups.push(react.createElement("div", { className: "skc-group", key: "g1" }, "本会话可用"));
					knowns.forEach(function (s) { groups.push(row(s, false)); });
				}
			}
			return react.createElement(react.Fragment, null, groups);
		}

		function row(s, isNew) {
			return react.createElement("div", { className: "skc-item", key: s.name },
				react.createElement("div", { className: "skc-icon" }, s.name.slice(0, 1).toUpperCase()),
				react.createElement("div", { className: "skc-main" },
					react.createElement("div", { className: "skc-name" },
						s.title,
						react.createElement("span", { className: "skc-tag" + (isNew ? " skc-tag-new" : "") }, isNew ? "新·待收录" : "本会话可用")
					),
					react.createElement("div", { className: "skc-desc" }, s.purpose),
					s.examples && s.examples.length ? react.createElement("div", { className: "skc-ex" }, s.examples.map(function (ex, i) { return react.createElement("div", { key: i }, "💬 " + ex); })) : null,
					react.createElement("div", { className: "skc-src" }, "来源：" + s.source)
				)
			);
		}

		function Panel(props) {
			var open = useStoreOpen();
			if (props && props.sessionId) loadSkills(props.ctx, props.sessionId);
			if (!open) return null;
			return react.createElement(react.Fragment, null,
				react.createElement("div", { className: "skc-layer", onClick: function () { store.close(); } }),
				react.createElement("div", { className: "skc-panel", onClick: function (e) { e.stopPropagation(); } },
					react.createElement("div", { className: "skc-head" },
						"🧩 技能速查",
						react.createElement("button", { className: "skc-close", onClick: function () { store.close(); }, "aria-label": "关闭" }, "✕")
					),
					react.createElement("div", { className: "skc-body" }, react.createElement(SkillList, null)),
					store.note ? react.createElement("div", { className: "skc-foot" }, store.note) : null
				)
			);
		}

		// 闭包持有 ctx：组件收 owner props，需要 ctx 时从这里取
		function makeComp(Component, ctx) {
			return function (props) {
				return react.createElement(Component, Object.assign({}, props, { ctx: ctx }));
			};
		}

		function apply(ctx) {
			var slots = ctx.get("slots");
			if (!slots) return;
			slots.inject("conversation.input.left", function () {
				return slots.register({ name: "conversation.input.left", id: "skill-cheat-trigger" }, makeComp(Trigger, ctx));
			});
			slots.inject("shell.overlay", function () {
				return slots.register({ name: "shell.overlay", id: "skill-cheat-panel" }, makeComp(Panel, ctx));
			});
		}

		exports.apply = apply;
		exports.inject = ["slots", "connection"];
		return module.exports;
	}
});
