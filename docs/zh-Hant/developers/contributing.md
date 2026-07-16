# 貢獻指南

如水歡迎目標明確、並能維持產品在地優先 GTD 方向的貢獻。

請依照你計畫修改的儲存庫選用指南：

- [網站與文件貢獻指南](https://github.com/dongdongbh/mindwtr-web/blob/main/CONTRIBUTING.md)
- [應用程式與介面貢獻指南](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)

## 適合初次參與的貢獻

- 改善難以理解的文件頁面
- 修正不正確或已失效的操作說明
- 翻譯一個內容連貫的文件章節
- 為現有工作流程加入經過測試的範例

## 產品限制

提出變更前，請先確認符合以下限制：

- 核心功能不需要帳號
- 預設採用在地優先
- GTD 概念維持一致
- AI 與自動化功能保持選用
- 同步方式由使用者掌控

## 文件工作流程

1. 開始新增語系或重整章節前，請先提出 issue。
2. 編輯 [mindwtr-web 儲存庫](https://github.com/dongdongbh/mindwtr-web)中 `docs/` 下的來源。
3. 每個 pull request 只聚焦於一份指南、一個章節或一種語系。
4. 從儲存庫根目錄執行 `bun run check`。
5. 在 pull request 中說明變更了哪些頁面與語系。

## 文件變更

請根據使用者意圖撰寫文件。與其建立一份冗長的功能清單，更適合撰寫「從 TickTick 匯入」或「WebDAV 同步」這類頁面。

公開的使用者與開發者文件位於 `docs/` 下，並發布至 [docs.mindwtr.app](https://docs.mindwtr.app/)。流程文件、ADR 與發行說明則應放在[應用程式儲存庫的文件](https://github.com/dongdongbh/Mindwtr/tree/main/docs)中。GitHub Wiki 已停用，不再接受新的內容頁面。

網站貢獻指南定義了支援的文件語系、翻譯推出方式、術語來源、連結備援規則，以及 pull request 檢查項目。

英文是完整德文、西班牙文、法文、簡體中文與繁體中文文件的來源。維護者使用針對特定語言的程式設計代理更新各套靜態 Markdown 文件，再執行共用的建置與連結檢查。若譯文讀起來不自然，請使用頁面上的編輯連結，或提出 issue 並附上修正文字。

## 授權條款

如水採用 AGPL-3.0。所有貢獻均以相同授權條款接受。
