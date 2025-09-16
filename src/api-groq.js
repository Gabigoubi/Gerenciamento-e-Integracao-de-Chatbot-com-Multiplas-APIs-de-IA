// src/api-groq.js
const Groq = require("groq-sdk");

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT;

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

const conversationHistories = new Map();

async function getResponseGroq(userMessage, chatId) {
  if (!conversationHistories.has(chatId)) {
    console.log("[+] Iniciando novo histórico de chat para Groq ID:", chatId);
    conversationHistories.set(chatId, [
      { role: "system", content: SYSTEM_PROMPT },
    ]);
  }
  const history = conversationHistories.get(chatId);
  history.push({ role: "user", content: userMessage });

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192", // Llama 3 de 70b é excelente para código
      messages: history,
      temperature: 0.3,
      max_tokens: 500,
    });

    const botResponse = completion.choices[0].message.content.trim();
    history.push({ role: "assistant", content: botResponse });

    if (history.length > 8) {
      conversationHistories.set(chatId, [history[0], ...history.slice(-7)]);
    }

    return botResponse;
  } catch (error) {
    console.error("Erro ao gerar resposta da Groq:", error);
    return "Desculpe, ocorreu um erro com a API da Groq. Por favor, tente novamente.";
  }
}

module.exports = { getResponseGroq };
