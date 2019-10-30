// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
const { QnAMaker } = require('botbuilder-ai');
const { LUIS112Recognizer } = require('./luis112Recognizer');
const { LuisRecognizer } = require('botbuilder-ai');

class QnABot extends ActivityHandler {
    constructor() {
        super();

        try {
            this.qnaMaker = new QnAMaker({
                knowledgeBaseId: process.env.QnAKnowledgebaseId,
                endpointKey: process.env.QnAEndpointKey,
                host: process.env.QnAEndpointHostName
            });
        } catch (err) {
            console.warn(`QnAMaker Exception: ${ err } Check your QnAMaker configuration in .env`);
        }

        // If a new user is added to the conversation, send them a greeting message
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Welcome to the QnA Maker sample! Ask me a question and I will try to answer it.');
                }
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        // When a user sends a message, perform a call to the QnA Maker service to retrieve matching Question and Answer pairs.
        this.onMessage(async (context, next) => {
            if (!process.env.QnAKnowledgebaseId || !process.env.QnAEndpointKey || !process.env.QnAEndpointHostName) {
                let unconfiguredQnaMessage = 'NOTE: \r\n' + 
                    'QnA Maker is not configured. To enable all capabilities, add `QnAKnowledgebaseId`, `QnAEndpointKey` and `QnAEndpointHostName` to the .env file. \r\n' +
                    'You may visit www.qnamaker.ai to create a QnA Maker knowledge base.'

                 await context.sendActivity(unconfiguredQnaMessage)
            }
            else {
                console.log('Calling QnA Maker & LUIS');
                const { LuisAppId, LuisAPIKey, LuisAPIHostName } = process.env;
                const luisConfig = { applicationId: LuisAppId, endpointKey: LuisAPIKey, endpoint: `https://${ LuisAPIHostName }` };
                const luis112Recognizer = new LUIS112Recognizer(luisConfig);
                if(!luis112Recognizer.isConfigured) {
                    const messageText = 'NOTE: LUIS is not configured. To enable all capabilities, add `LuisAppId`, `LuisAPIKey` and `LuisAPIHostName` to the .env file.';
                    await context.sendActivity(messageText);
                }

                const luisResult = await luis112Recognizer.executeLuisQuery(context);
                console.log(luisResult);
                let qnaResults;

                switch (LuisRecognizer.topIntent(luisResult)) {
                    case 'CheckLocation':
                        if(JSON.stringify(luisResult.entities.$instance) != "{}" && luisResult.intents.CheckLocation.score > 0.8) {
                            context._activity.text = 'Does the 112 application also function abroad?';
                            qnaResults = await this.qnaMaker.getAnswers(context);
                        } else {
                            qnaResults = await this.qnaMaker.getAnswers(context);
                        } 
                        break; 
                    case 'CheckUsage':
                        if(JSON.stringify(luisResult.entities.$instance) != "{}" && luisResult.intents.CheckUsage.score > 0.8) {
                                context._activity.text = 'What can I do with the application?';
                                qnaResults = await this.qnaMaker.getAnswers(context);
                        } else {
                            qnaResults = await this.qnaMaker.getAnswers(context);
                        } 
                        break;
                    case 'CheckDownload':
                        if(JSON.stringify(luisResult.entities.$instance) != "{}" && luisResult.intents.CheckDownload.score > 0.8) {
                                context._activity.text = 'How can I download the application onto my phone and start to use it?';
                                qnaResults = await this.qnaMaker.getAnswers(context);
                            } else {
                                qnaResults = await this.qnaMaker.getAnswers(context);
                            } 
                        break;                              
                    default:
                        qnaResults = await this.qnaMaker.getAnswers(context);  
                }

                //qnaResults = await this.qnaMaker.getAnswers(context);

                // If an answer was received from QnA Maker, send the answer back to the user.
                if (qnaResults[0]) {
                    await context.sendActivity(qnaResults[0].answer);
    
                // If no answers were returned from QnA Maker, reply with help.
                } else {
                    await context.sendActivity('No QnA Maker answers were found.');
                }
    
            }
            
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.QnABot = QnABot;
