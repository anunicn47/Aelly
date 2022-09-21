import Strings from "../lib/db";
import format from "string-format";
import inputSanitization from "../sidekick/input-sanitization";
import Blacklist from "../database/blacklist";
import Client from "../sidekick/client";
import { proto } from "@adiwajshing/baileys";
import Aelly from "../sidekick/sidekick";
import { MessageType } from "../sidekick/message-type";
const abl = Strings.abl;

module.exports = {
    name: "abl",
    description: abl.DESCRIPTION,
    extendedDescription: abl.EXTENDED_DESCRIPTION,
    demo: { isEnabled: true, text: ".abl" },
    async handle(client: Client, chat: proto.IWebMessageInfo, Aelly: Aelly, args: string[]): Promise<void> {
        try {
            if (Aelly.isPm && Aelly.fromMe) {
                let PersonToBlacklist = Aelly.chatId;
                Blacklist.addBlacklistUser(PersonToBlacklist, "");
                client.sendMessage(
                    Aelly.chatId,
                    format(abl.PM_ACKNOWLEDGEMENT, PersonToBlacklist.substring(0, PersonToBlacklist.indexOf("@"))),
                    MessageType.text
                );
                return;
            } else {
                await client.getGroupMetaData(Aelly.chatId, Aelly);
                if (args.length > 0) {
                    let PersonToBlacklist = await inputSanitization.getCleanedContact(
                        args,
                        client,
                        Aelly);
                    if (PersonToBlacklist === undefined) return;
                    PersonToBlacklist += "@s.whatsapp.net";
                    if (Aelly.owner === PersonToBlacklist) {
                        client.sendMessage(
                            Aelly.chatId,
                            abl.CAN_NOT_BLACKLIST_BOT,
                            MessageType.text
                        );
                        return;
                    }
                    Blacklist.addBlacklistUser(
                        PersonToBlacklist,
                        Aelly.chatId
                    );
                    client.sendMessage(
                        Aelly.chatId,
                        format(abl.GRP_ACKNOWLEDGEMENT, PersonToBlacklist.substring(0, PersonToBlacklist.indexOf("@"))),
                        MessageType.text
                    );
                    return;
                } else if (Aelly.isTextReply) {
                    let PersonToBlacklist = Aelly.replyParticipant;
                    if (Aelly.owner === PersonToBlacklist) {
                        client.sendMessage(
                            Aelly.chatId,
                            abl.CAN_NOT_BLACKLIST_BOT,
                            MessageType.text
                        );
                        return;
                    }
                    Blacklist.addBlacklistUser(
                        PersonToBlacklist,
                        Aelly.chatId
                    );
                    client.sendMessage(
                        Aelly.chatId,
                        format(abl.GRP_ACKNOWLEDGEMENT, PersonToBlacklist.substring(0, PersonToBlacklist.indexOf("@"))),
                        MessageType.text
                    );
                    return;
                } else {
                    Blacklist.addBlacklistUser("", Aelly.chatId);
                    client.sendMessage(
                        Aelly.chatId,
                        format(abl.GRP_BAN, Aelly.groupName),
                        MessageType.text
                    );
                    return;
                }
            }
        } catch (err) {
            await inputSanitization.handleError(err, client, Aelly);
        }
    },
};
