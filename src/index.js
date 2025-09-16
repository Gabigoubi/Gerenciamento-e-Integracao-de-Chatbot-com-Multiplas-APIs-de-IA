// src/index.js
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// Usando a função local do 'api.js'
const { getResponse } = require("./api"); // Renomeado para getResponse

console.log("===================================");
console.log("✅ Codex-Bot iniciando...");
console.log("===================================");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { args: ["--no-sandbox"] },
});

const botStartTime = Math.floor(Date.now() / 1000);

client.on("qr", (qr) => {
  console.log("📱 Escaneie o QR Code para conectar:");
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  console.log("✅ Autenticado com sucesso!");
});

client.on("ready", () => {
  console.log("🚀 Codex-Bot está online e pronto para ajudar!");
});

client.on("message", async (msg) => {
  const chat = await msg.getChat();

  if (msg.timestamp < botStartTime) return; // Ignora mensagens antigas
  if (msg.from === "status@broadcast") return; // Ignora status

  const ugoFoiMencionado = (await msg.getMentions()).some(
    (c) => c.id._serialized === client.info.me._serialized
  );
  const isReplyToBot = (await msg.getQuotedMessage())?.fromMe;

  // Responde se for mencionado, for um reply ou se for uma conversa privada
  if (ugoFoiMencionado || isReplyToBot || !chat.isGroup) {
    console.log(`\n📩 Mensagem recebida de "${msg.from}"`);
    console.log(` 💬 Conteúdo: "${msg.body}"`);

    const userMessageContent = msg.body.replace(/@\d+/g, "").trim();
    console.log(` 🤖 Texto final para a IA: "${userMessageContent}"`);

    // Filtro de mensagem muito longa
    if (userMessageContent.length > 2000) {
      console.log(" ⚠️ AVISO: Mensagem muito longa. Ignorando IA.");
      msg.reply(
        "Sua mensagem é muito longa. Por favor, tente dividi-la em partes menores."
      );
      return;
    }

    try {
      console.log(" ⚙️ Enviando para a API para gerar resposta...");
      chat.sendStateTyping();

      const response = await getResponse(
        userMessageContent,
        chat.id._serialized
      );

      console.log(` ✅ SUCESSO: Resposta recebida da API.`);
      console.log(` 📤 Resposta do Codex: "${response}"`);
      msg.reply(response);
    } catch (e) {
      console.error(" ❌ ERRO: Falha ao chamar a IA!", e);
      msg.reply(
        "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente."
      );
    } finally {
      console.log(" 🎬 Finalizando o processo da mensagem.");
      chat.clearState();
    }
  }
});

client.on("auth_failure", (msg) => {
  console.error("‼️ FALHA GERAL NA AUTENTICAÇÃO!", msg);
});

client.initialize();
