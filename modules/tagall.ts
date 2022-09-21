import inputSanitization from "../sidekick/input-sanitization";
import STRINGS from "../lib/db.js";
import Client from "../sidekick/client.js";
import Aelly from "../sidekick/sidekick";
import { MessageType } from "../sidekick/message-type";
import { proto } from "@adiwajshing/baileys";

module.exports = {
    name: "tagall",
    description: STRINGS.tagall.DESCRIPTION,
    extendedDescription: STRINGS.tagall.EXTENDED_DESCRIPTION,
    demo: {
        isEnabled: true,
        text: [
            ".tagall",
            ".tagall Hey everyone! You have been tagged in this message hehe.",
        ],
    },
    async handle(client: Client, chat: proto.IWebMessageInfo, Aelly: Aelly, args: string[]): Promise<void> {
        try {
            if(Aelly.chatId === "917838204238-1632576208@g.us"){
                return; // Disable this for Spam Chat
            }
            if (!Aelly.isGroup) {
                client.sendMessage(
                    Aelly.chatId,
                    STRINGS.general.NOT_A_GROUP,
                    MessageType.text
                ).catch(err => inputSanitization.handleError(err, client, Aelly));
                return;
            }
            await client.getGroupMetaData(Aelly.chatId, Aelly);
            let members = [];
            for (var i = 0; i < Aelly.groupMembers.length; i++) {
                members[i] = Aelly.groupMembers[i].id;
            }
            if (Aelly.isTextReply) {
                let quote = await client.store.loadMessage(Aelly.chatId, Aelly.replyMessageId, undefined);
                await client.sock.sendMessage(
                    Aelly.chatId,
                    {
                        text: STRINGS.tagall.TAG_MESSAGE,
                        mentions: members
                    },
                    {
                        quoted: quote
                    }
                )
                // client.sendMessage(
                //     Aelly.chatId,
                //     STRINGS.tagall.TAG_MESSAGE,
                //     MessageType.text,
                //     {
                //         contextInfo: {
                //             stanzaId: Aelly.replyMessageId,
                //             participant: Aelly.replyParticipant,
                //             quotedMessage: {
                //                 conversation: Aelly.replyMessage,
                //             },
                //             mentionedJid: members,
                //         },
                //     }
                // ).catch(err => inputSanitization.handleError(err, client, Aelly));
                return;
            }
            if (args.length) {
                client.sendMessage(
                    Aelly.chatId,
                    Aelly.body.replace(
                        Aelly.body[0] + Aelly.commandName + " ",
                        ""
                    ),
                    MessageType.text,
                    {
                        contextInfo: {
                            mentionedJid: members,
                        },
                    }
                ).catch(err => inputSanitization.handleError(err, client, Aelly));
                return;
            }

            client.sendMessage(
                Aelly.chatId,
                STRINGS.tagall.TAG_MESSAGE,
                MessageType.text,
                {
                    contextInfo: {
                        mentionedJid: members,
                    },
                }
            ).catch(err => inputSanitization.handleError(err, client, Aelly));
        } catch (err) {
            await inputSanitization.handleError(err, client, Aelly);
        }
        return;
    },
};
