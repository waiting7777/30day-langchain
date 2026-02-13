/**
 * Day 2：Prompt 與 PromptTemplate
 * 目標：學會用模板組裝 Prompt，避免硬編碼
 *
 * 執行：npx tsx day02-prompt-templates/index.ts
 */

import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import {
  PromptTemplate,
  ChatPromptTemplate,
  MessagesPlaceholder,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("請在專案根目錄建立 .env 並設定 OPENAI_API_KEY");
    process.exit(1);
  }

  const chat = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 });

  // ========== 1. PromptTemplate：變數替換 ==========
  console.log("\n--- 1. PromptTemplate 基本用法 ---\n");

  const promptTemplate = PromptTemplate.fromTemplate(
    "請用{style}的風格，用一句話介紹{topic}。"
  );
  const formatted = await promptTemplate.format({
    style: "幽默",
    topic: "TypeScript",
  });
  console.log("格式化後的 prompt:", formatted);

  const response1 = await chat.invoke(formatted);
  console.log("回覆:", response1.content);

  // ========== 2. ChatPromptTemplate：System + Human ==========
  console.log("\n--- 2. ChatPromptTemplate（System + Human）---\n");

  const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", "你是{role}，回答時請簡短且專業。"],
    ["human", "{question}"],
  ]);

  const messages = await chatPrompt.invoke({
    role: "資深工程師",
    question: "什麼是 LangChain？",
  });
  const response2 = await chat.invoke(messages);
  console.log("回覆:", response2.content);

  // ========== 3. MessagesPlaceholder：帶對話歷史 ==========
  console.log("\n--- 3. MessagesPlaceholder（對話歷史）---\n");

  const promptWithHistory = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "你是友善助手。根據以下對話延續回答。"
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

  const history = [
    new HumanMessage("我想學 TypeScript"),
    new AIMessage("很好的選擇！TypeScript 是加上型別系統的 JavaScript。"),
  ];

  const messagesWithHistory = await promptWithHistory.invoke({
    history,
    input: "要從哪裡開始？",
  });
  const response3 = await chat.invoke(messagesWithHistory);
  console.log("回覆:", response3.content);

  // ========== 4. 從檔案載入 prompt 模板 ==========
  console.log("\n--- 4. 從檔案載入 prompt ---\n");

  const promptPath = join(__dirname, "prompts", "welcome.txt");
  let fileTemplate: string;
  try {
    fileTemplate = readFileSync(promptPath, "utf-8");
  } catch {
    fileTemplate = "請對 {name} 說一句簡短的歡迎，並提到 {topic}。";
  }

  const filePrompt = PromptTemplate.fromTemplate(fileTemplate);
  const fileFormatted = await filePrompt.format({
    name: "Wayne",
    topic: "30 天 LangChain 挑戰",
  });
  console.log("從檔案載入並格式化:", fileFormatted);
  const response4 = await chat.invoke(fileFormatted);
  console.log("回覆:", response4.content);

  console.log("\n--- Day 2 範例完成 ---\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
