import { create, Message, Whatsapp } from 'venom-bot';
import { Sender } from 'venom-bot/dist/api/model/message';
import { ChatService } from '../services/chat.service';
import { DatabaseProvider } from './database.provider';

const NEW_USER_FLOW = 'newUser';

export class WhatsAppProvider {
    private sessionName: string;
    private client: Whatsapp
    private chatService: ChatService

    /**
     * @param { string } sessionName 
     */
    constructor(sessionName: string) {
        this.sessionName = sessionName
    }

    /**
     * Start session of whatsapp
     */
    async init() {
        create({
            session: this.sessionName,
            multidevice: true,
            headless: true,
            devtools: false,
            useChrome: true,
            debug: false,
            logQR: true,
        }).then((client: Whatsapp) => {
            this.client = client
            this.chatService = new ChatService(client)
            this.listen()
        })
    }

    /**
     * Listen message and execute rules
     */
    listen() {
        this.client.onMessage(async (message: Message) => {
            const { contact } = message.chat;
            const isMessageTextAndNotGroup = this.isMessageTextAndNotGroup(message)

            if (!isMessageTextAndNotGroup) {
                return;
            }

            const to = message.chat.presence.id;
            const isNotNewContact = await this.isNotNewContact(contact, message)

            if (! isNotNewContact) {
                DatabaseProvider.saveChat(to)
                this.chatService.sendMessageByIndex(
                    NEW_USER_FLOW, 
                    to, 
                    message.chat.id
                )
                return;
            }

            this.chatService.sendMessageByIndex(
                message.body, 
                to, 
                message.chat.id
            )
        });
    }

    /**
     * Verify if is new contact
     * @param contact 
     * @param message 
     * @returns 
     */
    private async isNotNewContact(contact: Sender, message: Message): Promise<boolean> {
        if (! contact.isMyContact) {
            return DatabaseProvider.existChat(message.chat.presence.id)
        }

        return false;
    }

    /**
     * Is message text and not group
     * @param message 
     * @returns 
     */
    private isMessageTextAndNotGroup(message: Message): boolean {
        return ! message.isGroupMsg && ! message.isMedia && ! message.isMMS
    }
}