# Day 2：Prompt 與 PromptTemplate

## 當天目標

- 學會用模板組裝 Prompt，避免硬編碼
- 掌握 `PromptTemplate`、`ChatPromptTemplate`、`MessagesPlaceholder`
- 從 config / 檔案載入 prompt 的簡單做法

## 內容重點

1. **PromptTemplate**：`fromTemplate("...{變數}...")`，`format({ 變數: 值 })` 得到字串
2. **ChatPromptTemplate**：`fromMessages([["system", "..."], ["human", "..."])`，`invoke(values)` 得到 `BaseMessage[]` 可丟給 chat model
3. **MessagesPlaceholder**：在 `fromMessages` 裡放 `new MessagesPlaceholder("history")`，傳入 `history: BaseMessage[]` 即可帶入對話歷史
4. **從檔案載入**：讀取 `.txt` 當模板字串，再交給 `PromptTemplate.fromTemplate()`

## 如何執行

在專案根目錄：

```bash
npx tsx day02-prompt-templates/index.ts
```

（需已 `npm install` 且根目錄有 `.env` 設定 `OPENAI_API_KEY`）

## 檔案說明

| 檔案 | 說明 |
|------|------|
| `index.ts` | 四個範例：PromptTemplate、ChatPromptTemplate、MessagesPlaceholder、從檔案載入 |
| `prompts/welcome.txt` | 範例模板檔（變數：{name}、{topic}） |

## 學習心得

見 [學習心得.md](./學習心得.md)。
