# Day 1：環境與 Hello LangChain

## 當天目標

- 建置開發環境，完成第一次 LLM 呼叫
- 學會用 `@langchain/openai` 的 `ChatOpenAI` 發送訊息並取得回覆
- 設定 API Key（環境變數）

## 內容重點

1. **環境**：Node.js 專案、`@langchain/core`、`@langchain/openai`、`dotenv`
2. **API Key**：在專案根目錄建立 `.env`，設定 `OPENAI_API_KEY=你的金鑰`
3. **ChatOpenAI**：`new ChatOpenAI({ model, temperature })`，`chat.invoke(question)` 取得 `AIMessage`

## 如何執行

在專案根目錄（30day-langchain）下：

```bash
# 1. 安裝依賴（若尚未安裝）
npm install

# 2. 設定 API Key（.env 請放在專案根目錄，格式可參考本目錄 .env.example）
# 在專案根目錄建立 .env，內容：OPENAI_API_KEY=sk-你的金鑰

# 3. 執行 Day 1 腳本
npm run day01
```

或直接：

```bash
npx tsx day01-hello-langchain/index.ts
```

（需先在專案根目錄有 `.env` 且已 `npm install`）

## 檔案說明

| 檔案 | 說明 |
|------|------|
| `index.ts` | 主程式：載入環境變數、建立 ChatOpenAI、發問並印出回覆 |
| `.env.example` | 環境變數範例（請勿提交真實金鑰） |

## 學習心得

見 [學習心得.md](./學習心得.md)。
