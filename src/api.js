// src/api.js
const axios = require("axios");

const API_URL = process.env.API_URL;
const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT;

const conversationHistory = {};

async function getResponse(userMessage, chatId) {
  if (!conversationHistory[chatId]) {
    conversationHistory[chatId] = [];
  }

  conversationHistory[chatId].push({
    role: "user",
    content: userMessage,
  });

  // Limita o histórico para manter o contexto das últimas 6 trocas
  if (conversationHistory[chatId].length > 6) {
    conversationHistory[chatId].splice(0, 2);
  }

  try {
    const response = await axios.post(API_URL, {
      // Recomendo um modelo bom para código, como Llama 3 ou Mistral
      model: "mistral-7b-instruct-v0.1.Q4_0.gguf",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...conversationHistory[chatId],
      ],
      temperature: 0.5, // Menor para respostas mais precisas e menos criativas
      max_tokens: 500, // Aumentado para permitir blocos de código maiores
    });

    const finalResponse = response.data.choices[0].message.content.trim();

    conversationHistory[chatId].push({
      role: "assistant",
      content: finalResponse,
    });

    return finalResponse;
  } catch (error) {
    console.error(
      "Erro na API Local (GPT4All):",
      error.response ? error.response.data : error.message
    );
    return "Desculpe, ocorreu um erro de comunicação com a IA local. Verifique se o servidor está ativo.";
  }
}

module.exports = { getResponse };
