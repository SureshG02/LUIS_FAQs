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

## To try this sample

- Clone the repository OR download as zip from dropdown.

    ```bash
    git clone https://github.com/SureshG02/LUIS_FAQs.git
    ```

- In a terminal, navigate to `/LUIS_FAQs` folder.

- Install modules

    ```bash
    npm install
    ```

- Setup QnAMaker

    Please refer manual to set up QnA for 112 digia FAQs.
	
- Setup LUIS

    Please refer manual to set up LUIS model for 112 digia FAQs.
	
- Run the sample

	Update MicrosoftAppId, MicrosoftAppPassword, QnAKnowledgebaseId, QnAEndpointKey, QnAEndpointHostName, LuisAppId, LuisAPIKey and LuisAPIHostName in .env file and run below command.

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

## Prerequisites

Install Azure CLI

https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest

Use below commands to deploy to cloud.

az login

az account set --subscription "subscription-id"

## Go to LUIS_FAQs directory and run below command

az bot prepare-deploy --code-dir "." --lang Javascript

## Go to LUIS_FAQs folder and zip all files present there. Run below command from directory where zip file exists.

az webapp deployment source config-zip --resource-group "<resource-group-name>" --name "<name-of-web-app>" --src "code.zip"


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
