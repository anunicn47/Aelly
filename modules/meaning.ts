import Strings from "../lib/db";
import inputSanitization from "../sidekick/input-sanitization";
import googleDictionaryApi from "google-dictionary-api";
import Client from "../sidekick/client.js";
import Aelly from "../sidekick/sidekick";
import format from "string-format";
import { MessageType } from "../sidekick/message-type";
import { proto } from "@adiwajshing/baileys";

const MEANING = Strings.meaning;

module.exports = {
    name: "meaning",
    description: MEANING.DESCRIPTION,
    extendedDescription: MEANING.EXTENDED_DESCRIPTION,
    demo: {isEnabled: true, text: ".meaning meaning"},
    async handle(client: Client, chat: proto.IWebMessageInfo, Aelly: Aelly, args: string[]): Promise<void> {
        try {
            var word: string = "";
            if (Aelly.isTextReply) {
                word = Aelly.replyMessage;
            } else if (args.length === 0) {
                client.sendMessage(
                    Aelly.chatId,
                    MEANING.NO_ARG,
                    MessageType.text
                );
                return;
            } else {
                word = args.join(" ");
            }
            googleDictionaryApi
                .search(word)
                .then((results) => {
                    let mean: string = "";
                    for(let key in results[0].meaning){
                        mean += "\n\n"
                        mean += "*[" + key + "]* : "
                        mean += results[0].meaning[key][0].definition
                    }
                    const msg: string =
                        "*Word :* " + results[0].word + "\n\n*Meaning :*" + mean;
                    client
                        .sendMessage(Aelly.chatId, msg, MessageType.text)
                        .catch((err) =>
                            inputSanitization.handleError(err, client, Aelly)
                        );
                })
                .catch(() => {
                    client
                        .sendMessage(
                            Aelly.chatId,
                            format(MEANING.NOT_FOUND, word),
                            MessageType.text
                        )
                        .catch((err) =>
                            inputSanitization.handleError(err, client, Aelly)
                        );
                });
        } catch (err) {
            await inputSanitization.handleError(err, client, Aelly);
        }
    },
};
