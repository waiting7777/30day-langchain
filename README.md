# 30 天學會 LangChain × LangGraph × Deep Agents

個人 30 天學習歷程：從 LangChain 基礎到 LangGraph 工作流，再到 Deep Agents 實作。

## 課綱

完整每日課綱與學習重點請看：

**[📋 CURRICULUM.md](./CURRICULUM.md)**

## 四週大綱

| 週次 | 主題 | 內容摘要 |
|------|------|----------|
| **Week 1** | LangChain 基礎 | 環境、Prompt、Parser、Document Loaders、Embeddings、RAG、LCEL |
| **Week 2** | LangChain 進階 | Chains、Memory、Tools、Agents、Callbacks、RAG+Agent 小專案 |
| **Week 3** | LangGraph | 圖與狀態、條件邊、循環、Tool Calling、Subgraph、RAG Agent 實作 |
| **Week 4** | Deep Agents | ReAct/CoT、Planning、Multi-Agent、長期記憶、架構總覽、期末專案 |

## 目錄結構（隨學習進度更新）

```
.
├── README.md           # 本說明
├── CURRICULUM.md       # 30 天完整課綱
├── package.json        # 依賴（TypeScript）
├── day01-hello-langchain/
├── day02-prompt-templates/
├── ...
└── docs/
    └── 30day-summary.md   # 第 30 天學習總結
```

## 環境需求

- Node.js 18+
- TypeScript
- OpenAI 或 Anthropic API Key（依使用的 LLM 而定）

安裝依賴：

```bash
npm install
```

## 授權與用途

本 repo 為個人學習紀錄，程式碼與筆記僅供參考與交流使用。

---

*開始日期：_____ ｜ 目標：30 天內完成課綱並產出可運行的 Agent 專案*
