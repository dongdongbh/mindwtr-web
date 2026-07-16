# 参与贡献

如水欢迎目标明确、并能保持产品本地优先 GTD 方向的贡献。

请根据你计划修改的仓库选择指南：

- [网站与文档贡献指南](https://github.com/dongdongbh/mindwtr-web/blob/main/CONTRIBUTING.md)
- [应用与界面贡献指南](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)

## 适合首次贡献的内容

- 改进含义不清的文档页面
- 修正不准确或失效的说明
- 翻译一个完整、连贯的文档章节
- 为现有工作流程添加经过测试的示例

## 产品约束

提出更改前，请检查它是否符合以下约束：

- 核心功能无需账户
- 默认本地优先
- GTD 概念保持一致
- AI 与自动化始终可选
- 同步选择始终由用户掌控

## 文档工作流程

1. 开始新增语言或重组章节前先提交 issue。
2. 编辑 [mindwtr-web 仓库](https://github.com/dongdongbh/mindwtr-web)中 `docs/` 下的源文件。
3. 每个拉取请求只聚焦一篇指南、一个章节或一种语言。
4. 在仓库根目录运行 `bun run check`。
5. 在拉取请求中说明更改了哪些页面和语言。

## 文档更改

围绕用户意图编写文档。相比一份冗长的功能清单，更应采用“从 TickTick 导入”或“WebDAV 同步”这样的页面。

面向公众的用户与开发者文档位于 `docs/`，并发布到 <https://docs.mindwtr.app/>。流程文档、ADR 和发布说明应保存在[应用仓库文档](https://github.com/dongdongbh/Mindwtr/tree/main/docs)中。GitHub Wiki 已停用，不再接受新内容页面。

网站贡献指南规定了受支持的文档语言、翻译发布流程、术语来源、链接回退规则和拉取请求检查。

英文是完整德文、西班牙文、法文、简体中文和繁体中文文档的源文本。维护者使用专注各语言的编程代理更新每套静态 Markdown 文件，再运行共享构建与链接检查。如果译文读起来不自然，请使用页面的编辑链接，或提交包含正确措辞的 issue。

## 许可证

如水采用 AGPL-3.0。贡献也按同一许可证接受。
