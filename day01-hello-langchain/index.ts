/**
 * Day 1：Hello LangChain
 * 目標：完成第一次 LLM 呼叫
 *
 * 執行：在專案根目錄執行 npm run day01
 * 或：npx tsx day01-hello-langchain/index.ts
 */

import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

async function main() {
  // 檢查 API Key（.env 中的 OPENAI_API_KEY）
  if (!process.env.OPENAI_API_KEY) {
    console.error("請在專案根目錄建立 .env 並設定 OPENAI_API_KEY=你的金鑰");
    process.exit(1);
  }

  // 建立 ChatOpenAI 實例
  const chat = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
  });

  const question = "用一句話解釋什麼是 LangChain？";
  console.log("問：", question);
  console.log("---");

  // 發送訊息並取得回覆
  const response = await chat.invoke(question);

  console.log("答：", response.content);
  console.log("---");
  console.log("（完成第一次 LangChain LLM 呼叫）");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
