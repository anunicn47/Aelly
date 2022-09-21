import { proto } from "@adiwajshing/baileys";
import format from 'string-format';
import * as googleTTS from 'google-tts-api';
import STRINGS from "../lib/db.js";
import Client from "../sidekick/client.js";
import Aelly from "../sidekick/sidekick";
import { MessageType } from "../sidekick/message-type";

const tts = STRINGS.tts;

export = {
    name: "tts",
    description: tts.DESCRIPTION,
    extendedDescription: tts.EXTENDED_DESCRIPTION,
    demo: { isEnabled: true, text: ['.tts Hello, how are you?', '.tts Hello, how are you? | ja'] },
    async handle(client: Client, chat: proto.IWebMessageInfo, Aelly: Aelly, args: string[]): Promise<void> {
        let text: string = '';
        let langCode: string = "en";
        if(Aelly.isTextReply && Aelly.replyMessage){
            text = Aelly.replyMessage
        }else if(Aelly.isTextReply){
            await client.sendMessage(Aelly.chatId, tts.INCORRECT_REPLY, MessageType.text);
            return;
        }else{
            for (var i = 0; i < args.length; i++) {
                if (args[i] == '|') {
                    langCode = args[i + 1];
                    break;
                }
                text += args[i] + " ";
            }
        }
        const proccessing: proto.WebMessageInfo = await client.sendMessage(Aelly.chatId, tts.PROCESSING, MessageType.text);
        if (text === "") {
            await client.sendMessage(Aelly.chatId, tts.NO_INPUT, MessageType.text);
            return await client.deleteMessage(Aelly.chatId, { id: proccessing.key.id, remoteJid: Aelly.chatId, fromMe: true });
        }
        if (text.length > 200) {
            await client.sendMessage(Aelly.chatId, format(tts.TOO_LONG, text.length.toString()), MessageType.text);
        } else {
            try {
                const url: string = googleTTS.getAudioUrl(text, {
                    lang: langCode,
                    slow: false,
                    host: 'https://translate.google.com',
                });
                await client.sendMessage(Aelly.chatId, { url: url }, MessageType.audio);
            }
            catch (err) {
                console.log(err);
            }
        }
        return await client.deleteMessage(Aelly.chatId, { id: proccessing.key.id, remoteJid: Aelly.chatId, fromMe: true });
    }
}