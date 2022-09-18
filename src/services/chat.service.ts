import path from "path";
import { Chat, Whatsapp } from "venom-bot";
import { flow } from "../config/flow";

export class ChatService {
    private client: Whatsapp

    constructor(client: Whatsapp) {
        this.client = client;
    }

    /**
     * Find Message by index
     * @param index 
     * @returns 
     */
    private findFlowByIndex(index: any) {
        console.log(index)
        if (! flow.hasOwnProperty(index)) {
            return flow.default;
        }

        return flow[index as keyof typeof flow];
    }

    /**
     * Send message by index
     * 
     * @param index 
     * @param to 
     * @param chatId 
     */
    async sendMessageByIndex(index: string, to: string, chatId: string) {
        index = index.toLowerCase();
        
        const flowMessage = this.findFlowByIndex(index)

        await this.sendMessage(chatId, to, flowMessage)

        for (const children of flowMessage.childrens) {
            await this.sendMessage(chatId, to, children)
        }
    }

    /**
     * Execute rules of messages children
     * 
     * @param chatId 
     * @param to 
     * @param message 
     */
    private async sendMessage(chatId: string, to: string, message: any) {
        if (message.messages.length) {
            const messageChildren = message.messages.join('');
            await this.client.sendText(to, messageChildren);
        }

        if (message?.link) {
            await this.client.sendLinkPreview(
                chatId, 
                message.link.url,
                message.link.message
            );
        }

        if (message?.location) {
            await this.client.sendLocation(
                to, 
                message.location.lat, 
                message.location.long, 
                message.location.name
            )
        }

        if (message?.image) {
            await this.client.sendFile(
                to, 
                path.join(__dirname, '..', 'public', 'imgs', message.image.file), 
                message.image.name, 
                message.image.message
            )
        }
    }
}