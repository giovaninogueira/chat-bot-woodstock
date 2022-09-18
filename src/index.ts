import { WhatsAppProvider } from "./providers/whatsapp.provider";

const sessioName = 'session-woodstock';

const whatsAppProvider = new WhatsAppProvider(sessioName);

whatsAppProvider.init();