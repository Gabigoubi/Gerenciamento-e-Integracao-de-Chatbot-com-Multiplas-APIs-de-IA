# Codex-Bot: Chatbot de IA com LLM Local via WhatsApp

Um estudo de caso sobre a integração de um Modelo de Linguagem Grande (LLM) rodando localmente e APIs em um chatbot de WhatsApp, construído com Node.js.

## Sobre o Projeto

Este projeto é um chatbot funcional que opera através do WhatsApp, utilizando a biblioteca `whatsapp-web.js`. O seu diferencial é a capacidade de se conectar a um "cérebro" de IA rodando 100% localmente, através de um servidor como o GPT4All ou LM Studio.

O desenvolvimento foi conduzido de uma forma moderna: atuei como **Arquiteto da Solução e Engenheiro de Depuração**, utilizando uma IA generativa para a criação do código base e focando meu esforço na parte mais crítica do projeto: a **integração entre o cliente do WhatsApp e o servidor de IA local, e a resolução de problemas complexos** nesse fluxo.

## Tecnologias Utilizadas

* **Ambiente:** Node.js
* **Gerenciamento de Pacotes:** NPM
* **Módulos Principais:**
    * `whatsapp-web.js` - para a conexão com o WhatsApp
    * `axios` - para as requisições à API REST do servidor local
    * `dotenv` - para o gerenciamento de variáveis de ambiente
    * `qrcode-terminal` - para a autenticação no WhatsApp
* **IA:** Modelo LLM local (ex: Mistral 7B) servido via GPT4All

## Desafios e Aprendizados

O principal desafio deste projeto não foi a geração do código, mas a complexa tarefa de **estabelecer uma comunicação estável entre sistemas distintos**: o cliente do WhatsApp e o servidor de IA rodando na mesma máquina. O processo de 4 dias para resolver bugs de compatibilidade, gerenciar dependências e garantir que as requisições fossem enviadas e recebidas corretamente foi uma imersão profunda em:

* **Resolução de Problemas Complexos:** Identificar e corrigir erros em um ecossistema com múltiplas partes assíncronas.
* **Gerenciamento de Ambiente Local:** Configurar e manter um ambiente Node.js e um servidor de IA local funcionando em conjunto.
* **Comunicação via API:** Entender na prática o fluxo de uma requisição HTTP REST para uma aplicação local.

Este projeto foi a prova de que a habilidade mais valiosa no desenvolvimento de software não é apenas escrever código, mas garantir que sistemas complexos funcionem juntos de forma robusta e confiável.
