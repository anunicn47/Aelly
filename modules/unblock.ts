import Client from "../sidekick/client";
import { proto } from "@adiwajshing/baileys";
import Aelly from "../sidekick/sidekick";
import { MessageType } from "../sidekick/message-type"
import inputSanitization from "../sidekick/input-sanitization";
import Strings from "../lib/db";
const Reply = Strings.unblock;

module.exports = {
    name: "unblock",
    description: Reply.DESCRIPTION,
    extendedDescription: Reply.EXTENDED_DESCRIPTION,
    demo: { isEnabled: false },
    async handle(client: Client, chat: proto.IWebMessageInfo, Aelly: Aelly, args: string[]): Promise<void> {
        try{
            if (!Aelly.isTextReply && typeof args[0] == "undefined") {
                client.sendMessage(
                    Aelly.chatId,
                    Reply.MESSAGE_NOT_TAGGED,
                    MessageType.text
                );
                return;
            }
            const reply = chat.message.extendedTextMessage;
            var contact = "";
            if (!(args.length > 0)) {
                contact = reply.contextInfo.participant.split("@")[0];
            } else {
                contact = await inputSanitization.getCleanedContact(
                    args,
                    client,
                    Aelly
                );
            }

            if (contact === Aelly.owner.split("@")[0]) {
                client.sendMessage(
                    Aelly.chatId,
                    Reply.NOT_UNBLOCK_BOT,
                    MessageType.text
                );
                return;
            }

            if(contact === ""){
                client.sendMessage(
                    Aelly.chatId,
                    Reply.MESSAGE_NOT_TAGGED,
                    MessageType.text
                );
                return;
            }
                var JID = contact + "@s.whatsapp.net";
                client.sock.updateBlockStatus(JID, "unblock");
                client.sendMessage(
                    Aelly.chatId,
                    "*" + contact + " unblocked successfully.*",
                    MessageType.text
                );

        } catch (err) {
            await inputSanitization.handleError(
                err,
                client,
                Aelly,
                Reply.MESSAGE_NOT_TAGGED
            );
        }
    },
};