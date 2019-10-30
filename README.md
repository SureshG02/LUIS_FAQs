# 112_ChatBot_LUIS

This bot has been created using [Bot Framework](https://dev.botframework.com), it shows how to create a bot that uses the [QnA Maker Cognitive AI](https://www.qnamaker.ai) service.


## Prerequisites

This samples **requires** prerequisites in order to run.

### Overview

This bot uses [QnA Maker Service](https://www.qnamaker.ai), an AI based cognitive service, to implement simple Question and Answer conversational patterns.

We will be creating knowledge base for digia 112 FAQs using URL https://digia.com/en/112-suomi/frequently-asked-questions/. 

Please refer manual to check how to make QnA KB using URL.

This bot also uses LUIS model created at https://www.luis.ai/. Please refer manual to check how to make LUIS model.

- [Node.js](https://nodejs.org) version 10.14 or higher

    ```bash
    # determine node version
    node --version
    ```

### Create a QnAMaker Application to enable QnA Knowledge Bases

QnA knowledge base setup and application configuration steps can be found [here](https://aka.ms/qna-instructions).

## To try this sample

- Clone the repository

    ```bash
    git clone https://github.com/microsoft/botbuilder-samples.git
    ```

- In a terminal, navigate to `samples/javascript_nodejs/11.qnamaker`

    ```bash
    cd samples/javascript_nodejs/11.qnamaker
    ```

- Install modules

    ```bash
    npm install
    ```

- Setup QnAMaker

    Please refer manual to set up QnA for 112 digia FAQs.

	
- Setup LUIS

    Please refer manual to set up LUIS model for 112 digia FAQs.
	
- Run the sample

    ```bash
    npm start
    ```

## Testing the bot using Bot Framework Emulator

[Bot Framework Emulator](https://github.com/microsoft/botframework-emulator) is a desktop application that allows bot developers to test and debug their bots on localhost or running remotely through a tunnel.

- Install the Bot Framework Emulator version 4.3.0 or greater from [here](https://github.com/Microsoft/BotFramework-Emulator/releases)

### Connect to the bot using Bot Framework Emulator

- Launch Bot Framework Emulator
- File -> Open Bot
- Enter a Bot URL of `http://localhost:3978/api/messages`

## Deploy the bot to Azure

To learn more about deploying a bot to Azure, see [Deploy your bot to Azure](https://aka.ms/azuredeployment) for a complete list of deployment instructions.

az webapp deployment source config-zip --resource-group "Digisfaari_Chatbot_Resource_Group" --name "112digiarehearsal" --src "11.qnamaker.zip"


## LUIS Intents, Utterences and Entities

## Intent

CheckLocation

## Utterences

where can i use it ?

can i use it in us?

does this app works in india?

## Entities

app

country

## Intent

CheckDownload

## Utterences

from where to download it?

how to install it?

how to get it?

## Entities

operation
