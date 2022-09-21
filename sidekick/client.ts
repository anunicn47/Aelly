import { AnyMessageContent, GroupMetadata, GroupParticipant, proto, WASocket } from "@adiwajshing/baileys";
import { MessageType } from "./message-type";
import Aelly from "./sidekick";

class Client {
    sock: WASocket;
    store: any;

    constructor(sock: WASocket, store: any) {
        this.sock = sock;
        this.store = store;
    }

    async sendMessage(jid: string, content: any, type: string, options?: any) {
        let res: proto.WebMessageInfo;
        let ops: AnyMessageContent;
        if (type === MessageType.text) {
            ops = {
                text: content
            }
            if (options?.contextInfo?.mentionedJid) {
                ops.mentions = options.contextInfo.mentionedJid
            }
            res = await this.sock.sendMessage(jid, ops);
        } else if (type === MessageType.sticker) {
            res = await this.sock.sendMessage(jid, {
                sticker: new Buffer(content)
            })
        } else if (type === MessageType.audio) {
            res = await this.sock.sendMessage(jid, {
                audio: content,
                mimetype: 'audio/mp4'
            })
        } else if (type === MessageType.image) {
            ops = {
                image: content,
            }
            if (options?.caption) {
                ops.caption = options.caption;
            }
            res = await this.sock.sendMessage(jid, ops);
        } else if (type == MessageType.audio) {
            res = await this.sock.sendMessage(jid, {
                audio: content,
                mimetype: 'audio/mp3'
            });
        } else if (type === MessageType.buttonsMessage) {
            res = await this.sock.sendMessage(jid, content);
        } else if (type == MessageType.video) {
            ops = {
                video: content,
            }
            if (options?.caption) {
                ops.caption = options.caption;
            }
            res = await this.sock.sendMessage(jid, ops);
        } else if (type === MessageType.document) {
            ops = {
                text: options.caption
            }
            let ops2: any = {
                document: content,
            }
            if (options?.mimetype) {
                ops2.mimetype = options.mimetype;
                ops2.fileName = options.filename;
            }
            // console.log(ops2);
            await this.sock.sendMessage(jid, ops);
            res = await this.sock.sendMessage(jid, ops2);
        }
        return res;
    };

    async deleteMessage(jid: string, key: any) {
        await this.sock.sendMessage(jid, {
            delete: key
        });
    };

    async getGroupMetaData(jid: string, Aelly: Aelly) {
        const groupMetadata: GroupMetadata = jid.endsWith("@g.us") ? await this.sock.groupMetadata(jid) : null;
        const getGroupAdmins = (participants: GroupParticipant[]): string[] => {
            var admins: string[] = [];
            for (var i in participants) {
                participants[i].admin ? admins.push(participants[i].id) : '';
            }
            // console.log("ADMINS -> " + admins);
            return admins;
        }
        Aelly.groupName = Aelly.isGroup ? groupMetadata.subject : null;
        Aelly.groupMembers = Aelly.isGroup ? groupMetadata.participants : null;
        Aelly.groupAdmins = Aelly.isGroup ? getGroupAdmins(Aelly.groupMembers) : null;
        Aelly.groupId = Aelly.isGroup ? groupMetadata.id : null;
        Aelly.isBotGroupAdmin = Aelly.isGroup ? (Aelly.groupAdmins.includes(Aelly.owner)) : false;
        Aelly.isSenderGroupAdmin = Aelly.isGroup ? (Aelly.groupAdmins.includes(Aelly.sender)) : false;
    }
}

export = Client;