# 🤖 Codex-Bot: Chatbot de Inteligência Artificial para WhatsApp

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp" />
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />
  <img src="https://img.shields.io/badge/Google%20Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logoColor=white" alt="Groq" />
  <img src="https://img.shields.io/badge/Llama%203-0064E0?style=for-the-badge&logo=meta&logoColor=white" alt="Llama 3" />
  <img src="https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white" alt="Ollama" />
</p>

---

O Codex-Bot é uma aplicação em Node.js que transforma o WhatsApp em uma interface para interação com Modelos de Linguagem (LLMs). O principal diferencial do projeto é sua arquitetura flexível, que permite alternar o motor de inteligência entre um servidor local de IA (garantindo privacidade e custo zero) ou provedores em nuvem de alta performance.

---

## Motores de IA Suportados

A aplicação possui módulos independentes e fáceis de alternar para os seguintes provedores:

* **Local (GPT4All / LM Studio):** Permite rodar modelos como Mistral 7B diretamente na máquina de desenvolvimento.
* **OpenAI:** Integração com o modelo gpt-4o.
* **Groq:** Utiliza a infraestrutura da Groq para velocidade máxima com o modelo Llama 3.
* **Google Gemini:** Integração com o Gemini 1.5 Pro utilizando o gerenciamento de chat nativo do SDK.

---

## Abordagem de Desenvolvimento

O projeto foi construído utilizando Inteligência Artificial generativa para a criação do código base. O foco humano e o esforço de engenharia foram direcionados para o papel de Arquiteto da Solução e Engenheiro de Depuração, concentrando-se na resolução de problemas de integração, tratamento de assincronismo e estabilidade da comunicação entre o cliente do WhatsApp e os servidores de IA.

---

## Soluções de Engenharia Aplicadas

Para garantir o funcionamento estável do robô sem travar o aplicativo ou estourar os limites das APIs, as seguintes lógicas foram implementadas:

* **Gerenciamento de Histórico Multiusuário:** Uso de estruturas do tipo Map para isolar o histórico de conversa de cada usuário ou grupo de forma independente.
* **Janela Deslizante de Contexto:** O bot mantém apenas as últimas mensagens na memória para evitar lentidão. A lógica garante que as instruções iniciais do sistema (System Prompt) nunca sejam apagadas ao limpar o histórico antigo.
* **Controle de Escopo em Grupos:** Em conversas privadas, o bot responde a todas as mensagens. Em grupos, ele ignora o fluxo geral e só é ativado se for diretamente mencionado ou se responderem a uma mensagem enviada por ele.
* **Filtro de Backlog (Mensagens Antigas):** Quando o servidor é iniciado, ele ignora todas as mensagens recebidas enquanto estava offline, evitando responder em massa mensagens passadas.
* **Feedback de Interface (UX):** O bot aciona o estado de "Digitando..." no WhatsApp enquanto aguarda a resposta da API de IA, fornecendo um indicador visual para o usuário.
* **Trava de Segurança (Guardrail):** Filtro que bloqueia mensagens com mais de 2000 caracteres para evitar sobrecarga no processamento dos modelos.

---

## Tecnologias Utilizadas

* **Ambiente:** Node.js
* **Comunicação WhatsApp:** whatsapp-web.js
* **Requisições HTTP:** Axios
* **SDKs Oficiais:** openai, groq-sdk, @google/generative-ai
* **Autenticação via Terminal:** qrcode-terminal
* **Variáveis de Ambiente:** dotenv

---

## Como Executar o Projeto

### Pré-requisitos
* Node.js instalado na máquina.
* Caso utilize o modo local: GPT4All ou LM Studio rodando uma API local compatível com o formato da OpenAI.
* Caso utilize nuvem: Chaves de API correspondentes (OpenAI, Groq ou Gemini).

### Instalação

1. Clone o repositório para sua máquina local.
2. Acesse a pasta do projeto e instale as dependências:
```bash
npm install

```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (preencha conforme o motor escolhido):

```env
API_URL=http://localhost:4891/v1/chat/completions
SYSTEM_PROMPT="Sua instrução de comportamento para o bot aqui"
OPENAI_API_KEY=seu_token_aqui
GROQ_API_KEY=seu_token_aqui
GEMINI_API_KEY=seu_token_aqui

```

4. Inicie a aplicação com o comando:

```bash
node src/index.js

```

5. Escaneie o QR Code gerado no terminal utilizando o WhatsApp do seu celular.

---

## Licença

Este projeto está sob a licença ISC.

```

```
