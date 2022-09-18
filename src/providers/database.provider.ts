import * as fs from 'fs/promises';
import path from 'path';

export class DatabaseProvider {
    /**
     * Existe Chat
     * @param phone 
     */
     static async existChat(phone: string) {
        const result = await fs.readFile(path.join(__dirname, '..', 'database', 'database.json'), 'utf8');
        const chats = JSON.parse(result);
        return chats.filter((phoneFilter: string) => phoneFilter === phone).length
    }

    /**
     * Save chat
     * @param phone 
     */
    static async saveChat(phone: string) {
        const result = await fs.readFile(path.join(__dirname, '..', 'database', 'database.json'), 'utf8')
        const chats = JSON.parse(result);
        chats.push(phone)
        await fs.writeFile(path.join(__dirname, '..', 'database', 'database.json'), JSON.stringify(chats, null, 4))
    }
}