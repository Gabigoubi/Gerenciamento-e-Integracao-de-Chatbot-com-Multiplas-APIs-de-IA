// src/api-openai.js
const OpenAI = require("openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const conversationHistories = new Map();

async function getResponseOpenAI(userMessage, chatId) {
  if (!conversationHistories.has(chatId)) {
    console.log("[+] Iniciando novo histórico de chat para OpenAI ID:", chatId);
    conversationHistories.set(chatId, [
      { role: "system", content: SYSTEM_PROMPT },
    ]);
  }
  const history = conversationHistories.get(chatId);
  history.push({ role: "user", content: userMessage });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Recomendo um modelo mais forte para programação
      messages: history,
      temperature: 0.3, // Baixa para respostas de código precisas
      max_tokens: 500,
    });

    const botResponse = completion.choices[0].message.content.trim();
    history.push({ role: "assistant", content: botResponse });

    if (history.length > 8) {
      conversationHistories.set(chatId, [history[0], ...history.slice(-7)]);
    }

    return botResponse;
  } catch (error) {
    console.error("Erro ao gerar resposta da OpenAI:", error);
    return "Desculpe, ocorreu um erro com a API da OpenAI. Por favor, tente novamente.";
  }
}

module.exports = { getResponseOpenAI };
