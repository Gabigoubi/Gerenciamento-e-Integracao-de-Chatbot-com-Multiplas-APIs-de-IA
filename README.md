# Codex-Bot: Chatbot de IA com Múltiplas Integrações

Um estudo de caso sobre gerenciamento, integração e depuração de um sistema de IA conversacional construído em Node.js e conectado a múltiplos LLMs, tanto locais quanto via API.

## Sobre o Projeto

Este projeto é um chatbot funcional e customizável que opera através do WhatsApp, utilizando a biblioteca `whatsapp-web.js`. A sua principal característica é a capacidade de se conectar a diferentes modelos de linguagem (LLMs), permitindo uma flexibilidade enorme na escolha do "cérebro" da IA.

O desenvolvimento foi conduzido de uma forma moderna: atuei como **Arquiteto da Solução e Engenheiro de Depuração**, utilizando uma IA generativa para a criação do código base e focando meu esforço na parte mais crítica do projeto: a **integração e a resolução de problemas complexos**.

## Tecnologias e APIs

* [cite_start]**Ambiente:** Node.js 
* **Gerenciamento de Pacotes:** NPM
* **Módulos Principais:**
    * [cite_start]`whatsapp-web.js` - para a conexão com o WhatsApp 
    * `axios` - para as requisições às APIs REST
    * [cite_start]`dotenv` - para o gerenciamento de chaves de API 
    * [cite_start]`qrcode-terminal` - para a autenticação no WhatsApp 
* **APIs Integradas:**
    * IA Local (GPT4All / LM Studio)
    * Groq (Llama 3)
    * Google (Gemini 1.5 Pro)
    * OpenAI (GPT-4o)

## Desafios e Aprendizados

O principal desafio deste projeto não foi a geração do código inicial, mas a complexa tarefa de **integração e depuração** em um sistema com múltiplas partes assíncronas. O processo de 4 dias para resolver bugs de compatibilidade, gerenciar dependências e garantir que as diferentes APIs e módulos locais conversassem de forma estável foi uma imersão profunda em:

* **Resolução de Problemas Complexos:** Identificar e corrigir erros em um ecossistema com várias tecnologias interdependentes.
* **Integração de APIs:** Orquestrar múltiplas chamadas de rede e garantir que os dados fluam corretamente entre os sistemas.
* **Gerenciamento de Ambiente:** Configurar e manter um ambiente Node.js funcional com todas as suas dependências.

Este projeto foi a prova de que a habilidade mais valiosa no desenvolvimento de software moderno não é apenas escrever código, mas garantir que sistemas complexos funcionem juntos de forma robusta e confiável.
