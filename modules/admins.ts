import Strings from "../lib/db";
const ADMINS = Strings.admins;
import inputSanitization from "../sidekick/input-sanitization";
import Client from "../sidekick/client.js";
import Aelly from "../sidekick/sidekick";
import { MessageType } from "../sidekick/message-type";
import { proto } from "@adiwajshing/baileys";

module.exports = {
    name: "admins",
    description: ADMINS.DESCRIPTION,
    extendedDescription: ADMINS.EXTENDED_DESCRIPTION,
    demo: { text: ".admins", isEnabled: true },
    async handle(client: Client, chat: proto.IWebMessageInfo, Aelly: Aelly, args: string[]): Promise<void> {
        try {
            if (!Aelly.isGroup) {
                client.sendMessage(
                    Aelly.chatId,
                    ADMINS.NOT_GROUP_CHAT,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Aelly));
                return;
            }

            let message: string = "";
            await client.getGroupMetaData(Aelly.chatId, Aelly);
            for (let admin of Aelly.groupAdmins) {
                let number: string = admin.split("@")[0];
                message += `@${number} `;
            }

            client.sendMessage(Aelly.chatId, message, MessageType.text, {
                contextInfo: {
                    mentionedJid: Aelly.groupAdmins,
                },
            }).catch(err => inputSanitization.handleError(err, client, Aelly));
            return;
        } catch (err) {
            await inputSanitization.handleError(err, client, Aelly);
        }
    },
};
