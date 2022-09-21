import fs from 'fs'
import config from '../config'
import chalk from 'chalk'
import AellyClass from '../sidekick/sidekick'
import { Contact, GroupMetadata, GroupParticipant, proto, WASocket } from '@adiwajshing/baileys'


const resolve = async function (messageInstance: proto.IWebMessageInfo, client: WASocket) {
    var Aelly: AellyClass = new AellyClass();
    var prefix: string = config.PREFIX + '\\w+'
    var prefixRegex: RegExp = new RegExp(prefix, 'g');
    var SUDOstring: string = config.SUDO;
    try {
        var jsonMessage: string = JSON.stringify(messageInstance);
    } catch (err) {
        console.log(chalk.redBright("[ERROR] Something went wrong. ", err))
    }
    Aelly.chatId = messageInstance.key.remoteJid;
    Aelly.fromMe = messageInstance.key.fromMe;
    Aelly.owner = client.user.id.replace(/:.*@/g, '@');
    Aelly.mimeType = messageInstance.message ? (Object.keys(messageInstance.message)[0] === 'senderKeyDistributionMessage' ? Object.keys(messageInstance.message)[2] : (Object.keys(messageInstance.message)[0] === 'messageContextInfo' ? Object.keys(messageInstance.message)[1] : Object.keys(messageInstance.message)[0])) : null;
    Aelly.type = Aelly.mimeType === 'imageMessage' ? 'image' : (Aelly.mimeType === 'videoMessage') ? 'video' : (Aelly.mimeType === 'conversation' || Aelly.mimeType == 'extendedTextMessage') ? 'text' : (Aelly.mimeType === 'audioMessage') ? 'audio' : (Aelly.mimeType === 'stickerMessage') ? 'sticker' : (Aelly.mimeType === 'senderKeyDistributionMessage' && messageInstance.message?.senderKeyDistributionMessage?.groupId === 'status@broadcast') ? 'status' : null;
    Aelly.isTextReply = (Aelly.mimeType === 'extendedTextMessage' && messageInstance.message?.extendedTextMessage?.contextInfo?.stanzaId) ? true : false;
    Aelly.replyMessageId = messageInstance.message?.extendedTextMessage?.contextInfo?.stanzaId;
    Aelly.replyParticipant = messageInstance.message?.extendedTextMessage?.contextInfo?.participant.replace(/:.*@/g, '@');;
    Aelly.replyMessage = messageInstance.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation || messageInstance.message?.extendedTextMessage?.contextInfo?.quotedMessage?.extendedTextMessage?.text;
    Aelly.body = Aelly.mimeType === 'conversation' ? messageInstance.message?.conversation : (Aelly.mimeType == 'imageMessage') ? messageInstance.message?.imageMessage.caption : (Aelly.mimeType == 'videoMessage') ? messageInstance.message?.videoMessage.caption : (Aelly.mimeType == 'extendedTextMessage') ? messageInstance.message?.extendedTextMessage?.text : (Aelly.mimeType == 'buttonsResponseMessage') ? messageInstance.message?.buttonsResponseMessage.selectedDisplayText : null;
    Aelly.isCmd = prefixRegex.test(Aelly.body);
    Aelly.commandName = Aelly.isCmd ? Aelly.body.slice(1).trim().split(/ +/).shift().toLowerCase().split('\n')[0] : null;
    Aelly.isImage = Aelly.type === "image";
    Aelly.isReplyImage = messageInstance.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage ? true : false;
    Aelly.imageCaption = Aelly.isImage ? messageInstance.message?.imageMessage.caption : null;
    Aelly.isGIF = (Aelly.type === 'video' && messageInstance.message?.videoMessage?.gifPlayback);
    Aelly.isReplyGIF = messageInstance.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.gifPlayback ? true : false;
    Aelly.isSticker = Aelly.type === 'sticker';
    Aelly.isReplySticker = messageInstance.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage ? true : false;
    Aelly.isReplyAnimatedSticker = messageInstance.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage?.isAnimated;
    Aelly.isVideo = (Aelly.type === 'video' && !messageInstance.message?.videoMessage?.gifPlayback);
    Aelly.isReplyVideo = Aelly.isTextReply ? (jsonMessage.indexOf("videoMessage") !== -1 && !messageInstance.message?.extendedTextMessage?.contextInfo.quotedMessage.videoMessage.gifPlayback) : false;
    Aelly.isAudio = Aelly.type === 'audio';
    Aelly.isReplyAudio = messageInstance.message?.extendedTextMessage?.contextInfo?.quotedMessage?.audioMessage ? true : false;
    Aelly.logGroup = client.user.id.replace(/:.*@/g, '@');;
    Aelly.isGroup = Aelly.chatId.endsWith('@g.us');
    Aelly.isPm = !Aelly.isGroup;
    Aelly.sender = (Aelly.isGroup && messageInstance.message && Aelly.fromMe) ? Aelly.owner : (Aelly.isGroup && messageInstance.message) ? messageInstance.key.participant.replace(/:.*@/g, '@') : (!Aelly.isGroup) ? Aelly.chatId : null;
    Aelly.isSenderSUDO = SUDOstring.includes(Aelly.sender?.substring(0, Aelly.sender.indexOf("@")));

    return Aelly;
}

export = resolve;