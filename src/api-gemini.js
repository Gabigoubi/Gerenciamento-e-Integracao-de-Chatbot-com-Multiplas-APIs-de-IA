// src/api-gemini.js
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const chats = new Map();

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_UP,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_UP,
  },
];

const generationConfig = {
  maxOutputTokens: 500,
  temperature: 0.4,
};

async function getResponseGemini(userMessage, chatId) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    systemInstruction: SYSTEM_PROMPT, // Usando o campo nativo para o prompt do sistema
    safetySettings,
    generationConfig,
  });

  if (!chats.has(chatId)) {
    console.log(
      "[+] Iniciando novo histórico de chat para o Gemini ID:",
      chatId
    );
    // Para o Gemini 1.5, o histórico é gerenciado pelo objeto 'chat'
    chats.set(chatId, model.startChat({ history: [] }));
  }
  const chat = chats.get(chatId);

  try {
    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    const botResponse = response.text().trim();
    return botResponse;
  } catch (error) {
    if (error.response && error.response.promptFeedback) {
      console.error(
        "A resposta foi bloqueada pelo filtro de segurança:",
        error.response.promptFeedback
      );
      return "Sua solicitação foi bloqueada por um filtro de segurança. Por favor, reformule a pergunta.";
    }
    console.error("Erro ao gerar resposta do Gemini:", error);
    return "Desculpe, ocorreu um erro com a API do Gemini. Por favor, tente novamente.";
  }
}

module.exports = { getResponseGemini };
