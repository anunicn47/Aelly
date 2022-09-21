import chalk from "chalk";
import STRINGS from "../lib/db.js";
import inputSanitization from "../sidekick/input-sanitization";
import Client from "../sidekick/client";
import { proto } from "@adiwajshing/baileys";
import Aelly from "../sidekick/sidekick";
import { MessageType } from "../sidekick/message-type";

module.exports = {
    name: "remove",
    description: STRINGS.remove.DESCRIPTION,
    extendedDescription: STRINGS.remove.EXTENDED_DESCRIPTION,
    demo: { isEnabled: false },
    async handle(client: Client, chat: proto.IWebMessageInfo, Aelly: Aelly, args: string[]): Promise<void> {
        try {
            if (!Aelly.isGroup) {
                client.sendMessage(
                    Aelly.chatId,
                    STRINGS.general.NOT_A_GROUP,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Aelly));
                return;
            }
            await client.getGroupMetaData(Aelly.chatId, Aelly);
            if (!Aelly.isBotGroupAdmin) {
                client.sendMessage(
                    Aelly.chatId,
                    STRINGS.general.BOT_NOT_ADMIN,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Aelly));
                return;
            }
            let owner: string;
            for (const index in Aelly.groupMembers) {
                if (Aelly.groupMembers[index].admin === 'superadmin') {
                    owner = Aelly.groupMembers[index].id.split("@")[0];
                }
            }
            if (Aelly.isTextReply) {
                let PersonToRemove =
                    chat.message.extendedTextMessage.contextInfo.participant;
                if (PersonToRemove === owner + "@s.whatsapp.net") {
                    client.sendMessage(
                        Aelly.chatId,
                        "*" + owner + " is the owner of the group*",
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Aelly));
                    return;
                }
                if (PersonToRemove === Aelly.owner) {
                    client.sendMessage(
                        Aelly.chatId,
                        "```Why man, why?! Why would you use my powers to remove myself from the group?!🥺```\n*Request Rejected.* 😤",
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Aelly));
                    return;
                }
                var isMember = inputSanitization.isMember(
                    PersonToRemove,
                    Aelly.groupMembers
                );
                if (!isMember) {
                    client.sendMessage(
                        Aelly.chatId,
                        "*person is not in the group*",
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Aelly));
                }
                try {
                    if (PersonToRemove) {
                        await client.sock.groupParticipantsUpdate(Aelly.chatId, [PersonToRemove], 'remove').catch(err => inputSanitization.handleError(err, client, Aelly));
                        return;
                    }
                } catch (err) {
                    throw err;
                }
                return;
            }
            if (!args[0]) {
                client.sendMessage(
                    Aelly.chatId,
                    STRINGS.remove.INPUT_ERROR,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Aelly));
                return;
            }
            if (args[0][0] == "@") {
                const number = args[0].substring(1);
                if (parseInt(args[0]) === NaN) {
                    client.sendMessage(
                        Aelly.chatId,
                        STRINGS.remove.INPUT_ERROR,
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Aelly));
                    return;
                }

                if((number + "@s.whatsapp.net") === Aelly.owner){
                    client.sendMessage(
                        Aelly.chatId,
                        "```Why man, why?! Why would you use my powers to remove myself from the group?!🥺```\n*Request Rejected.* 😤",
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Aelly));
                    return;
                }

                if (!(number === owner)) {
                    await client.sock.groupParticipantsUpdate(Aelly.chatId, [number + "@s.whatsapp.net"], 'remove').catch(err => inputSanitization.handleError(err, client, Aelly));
                    return;
                } else {
                    client.sendMessage(
                        Aelly.chatId,
                        "*" + owner + " is the owner of the group*",
                        MessageType.text
                    ).catch(err => inputSanitization.handleError(err, client, Aelly));
                    return;
                }
            }
            client.sendMessage(
                Aelly.chatId,
                STRINGS.remove.INPUT_ERROR,
                MessageType.text
            ).catch(err => inputSanitization.handleError(err, client, Aelly));
        } catch (err) {
            await inputSanitization.handleError(err, client, Aelly);
            return;
        }
    },
};
