# 30 天學會 LangChain × LangGraph × Deep Agents

> 從零到能打造 AI Agent 的學習課綱，適合放在 GitHub 作為學習歷程紀錄。

---

## 學習目標

- **LangChain**：掌握 LLM 應用開發的組件與鏈式編程
- **LangGraph**：學會用圖結構設計多步驟、有狀態的 AI 工作流
- **Deep Agents**：理解並實作具備規劃、工具調用與記憶的智能體

---

## 課綱總覽

| 週次 | 主題           | 天數   | 產出重點                 |
|------|----------------|--------|--------------------------|
| 1    | LangChain 基礎 | Day 1–7 | 環境、Prompt、LLM 呼叫   |
| 2    | LangChain 進階 | Day 8–14 | Chains、Memory、Tools、Agents |
| 3    | LangGraph      | Day 15–21 | 圖、節點、邊、狀態、循環 |
| 4    | Deep Agents    | Day 22–30 | ReAct、規劃、多 Agent、專案 |

---

## 第一週：LangChain 基礎（Day 1–7）

### Day 1：環境與 Hello LangChain
- **目標**：建置開發環境，完成第一次 LLM 呼叫
- **內容**：
  - 建立 Node.js 專案、安裝 `@langchain/core`、`@langchain/openai`（或 `@langchain/anthropic`）
  - 設定 API Key（環境變數，如 `.env`）
  - 使用 `ChatOpenAI` / `ChatAnthropic` 發送簡單訊息並取得回覆
- **產出**：`day01-hello-langchain/`，可執行 TypeScript 腳本 + `package.json`

### Day 2：Prompt 與 PromptTemplate
- **目標**：學會用模板組裝 Prompt，避免硬編碼
- **內容**：
  - `PromptTemplate` 基本用法、變數替換
  - `ChatPromptTemplate`、`MessagesPlaceholder`
  - 從 config / 檔案載入 prompt 的簡單做法
- **產出**：`day02-prompt-templates/`，多個 template 範例

### Day 3：Output Parser（結構化輸出）
- **目標**：讓 LLM 輸出可被程式解析的結構（JSON、列表等）
- **內容**：
  - 使用 Zod schema + `StructuredOutputParser` 或 `withStructuredOutput()`
  - `CommaSeparatedListOutputParser`、`JsonOutputParser`
  - 結合 `getFormatInstructions()` 與 prompt
- **產出**：`day03-output-parsers/`，至少一種 parser 範例

### Day 4：Document Loaders 與文字分割
- **目標**：載入文件並切成適合檢索的區塊
- **內容**：
  - `TextLoader`、`DirectoryLoader`、`PDFLoader`（或 `UnstructuredFileLoader`）
  - `RecursiveCharacterTextSplitter`：chunkSize、chunkOverlap、separators
  - 簡短討論 chunk 策略對 RAG 的影響
- **產出**：`day04-document-loaders/`，載入並分割一份 PDF 或 TXT

### Day 5：Embeddings 與 Vector Store
- **目標**：將文字轉成向量並存入向量庫，支援相似度搜尋
- **內容**：
  - `OpenAIEmbeddings`（或 `HuggingFaceEmbeddings`）
  - 使用 `FAISS` 或 `Chroma` 建立 in-memory / 持久化 vector store
  - `add_documents`、`similarity_search`、`similarity_search_with_score`
- **產出**：`day05-embeddings-vectorstore/`，建立索引並查詢

### Day 6：Retrievers 與 RAG 入門
- **目標**：實作最簡版 RAG：檢索 + 組 prompt + LLM 生成
- **內容**：
  - `VectorStoreRetriever`、`retriever.get_relevant_documents(query)`
  - 將檢索結果放進 prompt，再呼叫 LLM
  - 認識 `RetrievalQA` 或手動組 RAG chain
- **產出**：`day06-rag-basics/`，問答腳本，可針對自訂文件回答

### Day 7：LCEL（LangChain Expression Language）
- **目標**：用 `|` 串接組件，寫出可讀、可串流的 chain
- **內容**：
  - `prompt | llm`、`prompt | llm | output_parser`
  - `.invoke()`、`.stream()`、`.batch()`
  - 簡單錯誤處理與 fallback
- **產出**：`day07-lcel/`，一個可串流的 RAG 或問答 chain

---

## 第二週：LangChain 進階（Day 8–14）

### Day 8：Chains 進階（Sequential、Router）
- **目標**：多步驟 chain、依條件選擇子 chain
- **內容**：
  - `SequentialChain`、`LLMChain` 串接
  - `LLMRouterChain` + `MultiPromptChain` 或自訂 router（依主題選 prompt）
- **產出**：`day08-chains/`，至少一個多步驟 + 一個 router 範例

### Day 9：Memory（對話記憶）
- **目標**：讓 chain 記得前幾輪對話
- **內容**：
  - `ConversationBufferMemory`、`ConversationBufferWindowMemory`
  - `ConversationSummaryMemory`（節省 token）
  - 在 `ConversationalRetrievalChain` 或自訂 chain 中掛載 memory
- **產出**：`day09-memory/`，帶記憶的對話機器人

### Day 10：Tools 定義與使用
- **目標**：定義「工具」介面，供 Agent 呼叫
- **內容**：
  - 使用 `@tool` 或 `StructuredTool.from_function` 定義工具
  - 工具描述（description）對 Agent 選擇的影響
  - 手動示範：給 LLM 工具列表與格式，讓它回傳「要呼叫哪個工具、參數為何」
- **產出**：`day10-tools/`，3 個以上自訂 tool，並手動呼叫一次

### Day 11：LangChain Agents 入門
- **目標**：使用內建 Agent 讓 LLM 自動選工具、執行、再推理
- **內容**：
  - `create_tool_calling_agent`、`AgentExecutor`
  - ReAct 風格的思考與行動循環
  - 處理 parsing error、max_iterations、early_stopping
- **產出**：`day11-agents-intro/`，一個會用 2–3 個工具的 Agent

### Day 12：Agent 類型與比較
- **目標**：認識不同 Agent 類型與適用場景
- **內容**：
  - ReAct、OpenAI Functions / Tool Calling、Structured Chat
  - 比較：何時用 ReAct、何時用 native function calling
  - 簡單 benchmark：同任務下不同 agent 的步數與成功率
- **產出**：`day12-agent-types/`，同一組工具、兩種 agent 的對照範例

### Day 13：Callbacks 與可觀測性
- **目標**：掛載 callback 紀錄 token、延遲、錯誤，方便除錯與優化
- **內容**：
  - `BaseCallbackHandler`、`AsyncCallbackHandler`
  - 紀錄 on_llm_start、on_llm_end、on_chain_end
  - 與 LangSmith 串接（可選）或自訂 log 到檔案
- **產出**：`day13-callbacks/`，自訂 handler 並在 chain/agent 上使用

### Day 14：實戰小專案——RAG + Agent
- **目標**：結合 RAG 與 Agent：先檢索再回答，必要時呼叫外部工具
- **內容**：
  - 設計「文件問答 + 計算/查天氣」情境
  - RAG 當作一個 tool，或先 RAG 再讓 Agent 決定是否要其他工具
  - 簡單 CLI 或 Streamlit 介面（選做）
- **產出**：`day14-rag-agent/`，可執行的整合專案

---

## 第三週：LangGraph（Day 15–21）

### Day 15：LangGraph 概念與第一個圖
- **目標**：理解「圖 = 節點 + 邊 + 狀態」，寫出第一個圖
- **內容**：
  - 安裝 `langgraph`，概念：StateGraph、節點函數、邊
  - 定義簡單狀態（如 `messages: list`），一個「回覆」節點、起點到終點
  - `compile()`、`invoke()`，觀察 state 變化
- **產出**：`day15-langgraph-intro/`，最簡對話圖（user -> bot -> end）

### Day 16：條件邊與分支
- **目標**：依狀態決定下一跳（條件邊）
- **內容**：
  - `add_conditional_edges(source, routing_fn, path_map)`
  - 範例：依使用者意圖路由到「查詢」「閒聊」「寫程式」節點
  **產出**：`day16-conditional-edges/`，多分支圖

### Day 17：多節點與狀態傳遞
- **目標**：多個節點協作、狀態在節點間累積
- **內容**：
  - 狀態 schema 設計（TypedDict 或 Pydantic）
  - 節點讀寫 state（append message、更新欄位）
  - 範例：檢索節點 -> 改寫節點 -> 回答節點
- **產出**：`day17-multi-node-state/`，3 節點以上的線性/分支圖

### Day 18：循環與 Human-in-the-Loop
- **目標**：圖中出現循環，並在特定條件下中斷（如需要人工確認）
- **內容**：
  - 從某節點回到前面節點（loop）
  - `interrupt_before` / `interrupt_after`，`checkpoint` 持久化
  - 使用 `invoke` 的 `config` 傳入 `thread_id`，模擬多輪對話
- **產出**：`day18-cycles-human-in-loop/`，可中斷並恢復的流程

### Day 19：LangGraph 與 Tool Calling
- **目標**：在圖的節點中呼叫 LLM 並讓其決定是否使用工具，循環直到完成
- **內容**：
  - 節點內：bind_tools、處理 tool_calls、執行工具、將結果塞回 messages
  - 條件邊：若還有 tool_calls -> 回工具節點，否則 -> 結束
  - 對比 LangChain AgentExecutor 的差異
- **產出**：`day19-langgraph-tools/`，具備工具調用的圖

### Day 20：Subgraph 與可重用模組
- **目標**：把一段圖封裝成 subgraph，在主圖中重複使用
- **內容**：
  - 用 `StateGraph` 建子圖、`compile()` 後當成一個節點
  - 主圖呼叫 subgraph，狀態映射（輸入/輸出欄位）
  - 範例：「檢索 + 生成」打包成 subgraph，主圖依路由呼叫多次
- **產出**：`day20-subgraphs/`，主圖 + 至少一個 subgraph

### Day 21：實戰——LangGraph 版 RAG Agent
- **目標**：用 LangGraph 從頭實作「檢索 -> 判斷要不要工具 -> 回答 -> 可追問」流程
- **內容**：
  - 節點：retrieve、reason、call_tools、respond
  - 條件邊：是否需要工具、是否結束
  - 可選：stream 圖的狀態變化到前端
- **產出**：`day21-langgraph-rag-agent/`，完整可運行圖

---

## 第四週：Deep Agents 與專案（Day 22–30）

### Day 22：ReAct 與 CoT 深入
- **目標**：理解 ReAct（Reasoning + Acting）與 Chain-of-Thought 在實作上的差異
- **內容**：
  - ReAct prompt 結構：Thought / Action / Observation
  - 在 LangChain 或 LangGraph 中實作一版「手動」ReAct 循環
  - 討論：何時加 CoT、何時只要 tool calling
- **產出**：`day22-react-cot/`，對比範例或筆記

### Day 23：Planning Agent 概念
- **目標**：認識「先規劃、再執行」的 Agent 架構
- **內容**：
  - Plan-and-Execute 架構：Planner（拆任務） + Executor（執行子任務）
  - 使用 LangChain `PlanAndExecute` 或自訂：LLM 產出步驟列表，再逐步執行
  - 與 ReAct 的差異：一次規劃 vs 邊做邊想
- **產出**：`day23-planning-agent/`，簡易 Plan-and-Execute 範例

### Day 24：Multi-Agent 入門
- **目標**：多個 Agent 分工（例如：研究員 + 寫手 + 審稿）
- **內容**：
  - 多個 Agent 各自有 prompt 與工具，彼此透過「訊息」或共享狀態溝通
  - 使用 LangGraph 建模：每個 Agent 一個節點，邊表示傳話
  - 簡單範例：Agent A 查資料 -> Agent B 撰寫 -> Agent C 總結
- **產出**：`day24-multi-agent/`，2–3 個 Agent 協作流程

### Day 25：Multi-Agent 進階（協調與衝突）
- **目標**：處理多 Agent 的協調、順序、或簡單衝突解決
- **內容**：
  - 主管 Agent（Supervisor）分配任務給專門 Agent
  - 討論：何時用 round-robin、何時用 router、何時用投票
  - 實作：Supervisor 節點 + 多個 worker 節點
- **產出**：`day25-multi-agent-supervisor/`，Supervisor 架構範例

### Day 26：長期記憶與知識管理
- **目標**：讓 Agent 具備「長期記憶」（跨對話、可檢索）
- **內容**：
  - 概念：將重要資訊寫入 vector store 或知識庫，之後可被檢索
  - LangChain `EntityMemory`、或自訂：從對話摘要寫入、之後 RAG 檢索
  - 與 Day 9 的 buffer memory 對比
- **產出**：`day26-long-term-memory/`，具備寫入/檢索的記憶範例

### Day 27：Deep Agents 架構總覽
- **目標**：整理所學，畫出「Deep Agent」常見架構圖
- **內容**：
  - 組件：Planning、Memory（短期/長期）、Tools、Reflection/Self-critique
  - 參考架構：AutoGPT、BabyAGI、CrewAI、LangGraph 官方 pattern
  - 撰寫部落格或 README：自己的一頁架構說明
- **產出**：`day27-deep-agents-architecture/`，架構圖 + 短文

### Day 28：專案選題與設計
- **目標**：選定一個期末專案，寫出規格與實作計畫
- **內容**：
  - 範例方向：個人知識庫助手、客服 Agent、程式碼審查助手、多步驟研究助手
  - 列出：使用的模型、工具、圖結構、介面（CLI / Web）
  - 拆成 2–3 天的實作任務
- **產出**：`day28-project-design/`，PROJECT_SPEC.md + 任務清單

### Day 29：專案實作（上）
- **目標**：完成專案核心：圖/Agent 邏輯、主要工具、基本流程
- **內容**：
  - 依 Day 28 計畫實作：狀態設計、節點、邊、工具串接
  - 單元測試或手動測試主要路徑
- **產出**：在專案 repo 中提交核心程式碼

### Day 30：專案實作（下）與總結
- **目標**：完成介面、錯誤處理、README，並撰寫學習總結
- **內容**：
  - 完善 CLI / Streamlit / FastAPI（擇一）
  - 撰寫 README：如何安裝、設定、執行、專案架構說明
  - 寫「30 天學習總結」：最難的部分、最實用的技巧、下一步想學什麼
- **產出**：可運行的完整專案 + `docs/30day-summary.md`

---

## 建議環境與依賴

- **Node.js**：18+
- **語言**：TypeScript
- **主要套件**：`@langchain/core`、`@langchain/openai`（或 `@langchain/anthropic`）、`@langchain/langgraph`、`langchain`
- **向量庫**：`@langchain/community` 的 vector store（如 MemoryVectorStore、Chroma）
- **可選**：`@langchain/langsmith`（可觀測性）、前端框架（快速 UI）

---

## Repo 結構建議

```
30day-langchain/
├── README.md              # 專案說明與課綱連結
├── CURRICULUM.md          # 本課綱（你正在看的）
├── package.json           # 依賴（TypeScript）
├── day01-hello-langchain/
├── day02-prompt-templates/
├── ...
├── day30-project/
└── docs/
    └── 30day-summary.md   # 第 30 天總結
```

每個 `dayXX-.../` 建議包含：
- `README.md`：當天目標與筆記
- 可執行程式碼與必要設定範例
- 若需額外依賴可註明在根目錄 `package.json` 或該日 README

---

## 學習建議

1. **每天產出可運行程式**：哪怕只有一個小腳本，也方便日後複習與展示。
2. **善用官方文件**：LangChain / LangGraph 文件與範例更新快，遇到 API 變動可對照最新版。
3. **記錄卡關點**：在每日 README 或 issue 記下「卡在哪、怎麼解」，有助寫總結與幫助他人。
4. **先跑通再優化**：先以最簡單方式完成當天目標，再考慮效能、架構與擴充。

祝 30 天學習順利，歡迎把 repo 連結與心得分享到社群。
