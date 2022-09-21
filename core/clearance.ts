import chalk from 'chalk';
import config from '../config';
import { adminCommands, sudoCommands } from "../sidekick/input-sanitization"
import STRINGS from "../lib/db";
import Users from '../database/user';
import format from 'string-format';
import Aelly from '../sidekick/sidekick';
import { WASocket } from '@adiwajshing/baileys';
import Client from '../sidekick/client';
import { MessageType } from '../sidekick/message-type';

const GENERAL = STRINGS.general;

const clearance = async (Aelly: Aelly, client: Client, isBlacklist: boolean): Promise<boolean> => {
    if (isBlacklist) {
        if (Aelly.isGroup) {
            await client.getGroupMetaData(Aelly.chatId, Aelly);
            if ((!Aelly.fromMe && !Aelly.isSenderSUDO && !Aelly.isSenderGroupAdmin)) {
                return false;
            }
        } else if ((!Aelly.fromMe && !Aelly.isSenderSUDO)) {
            console.log(chalk.blueBright.bold(`[INFO] Blacklisted Chat or User.`));
            return false;
        }
    }
    else if ((Aelly.chatId === "917838204238-1634977991@g.us" || Aelly.chatId === "120363020858647962@g.us" || Aelly.chatId === "120363023294554225@g.us")) {
        console.log(chalk.blueBright.bold(`[INFO] Bot disabled in Support Groups.`));
        return false;
    }
    if (Aelly.isCmd && (!Aelly.fromMe && !Aelly.isSenderSUDO)) {
        if (config.WORK_TYPE.toLowerCase() === "public") {
            if (Aelly.isGroup) {
                await client.getGroupMetaData(Aelly.chatId, Aelly);
                if (adminCommands.indexOf(Aelly.commandName) >= 0 && !Aelly.isSenderGroupAdmin) {
                    console.log(
                        chalk.redBright.bold(`[INFO] admin commmand `),
                        chalk.greenBright.bold(`${Aelly.commandName}`),
                        chalk.redBright.bold(
                            `not executed in public Work Type.`
                        )
                    );
                    await client.sendMessage(
                        Aelly.chatId,
                        GENERAL.ADMIN_PERMISSION,
                        MessageType.text
                    );
                    return false;
                } else if (sudoCommands.indexOf(Aelly.commandName) >= 0 && !Aelly.isSenderSUDO) {
                    console.log(
                        chalk.redBright.bold(`[INFO] sudo commmand `),
                        chalk.greenBright.bold(`${Aelly.commandName}`),
                        chalk.redBright.bold(
                            `not executed in public Work Type.`
                        )
                    );
                    let messageSent: boolean = await Users.getUser(Aelly.chatId);
                    if (messageSent) {
                        console.log(chalk.blueBright.bold("[INFO] Promo message had already been sent to " + Aelly.chatId))
                        return false;
                    }
                    else {
                        await client.sendMessage(
                            Aelly.chatId,
                            format(GENERAL.SUDO_PERMISSION, { worktype: "public", groupName: Aelly.groupName ? Aelly.groupName : "private chat", commandName: Aelly.commandName }),
                            MessageType.text
                        );
                        await Users.addUser(Aelly.chatId);
                        return false;
                    }
                } else {
                    return true;
                }
            }else if(Aelly.isPm){
                return true;
            }
        } else if (config.WORK_TYPE.toLowerCase() != "public" && !Aelly.isSenderSUDO) {
            console.log(
                chalk.redBright.bold(`[INFO] commmand `),
                chalk.greenBright.bold(`${Aelly.commandName}`),
                chalk.redBright.bold(
                    `not executed in private Work Type.`
                )
            );
            //             let messageSent = await Users.getUser(Aelly.chatId);
            //             if(messageSent){
            //                 console.log(chalk.blueBright.bold("[INFO] Promo message had already been sent to " + Aelly.chatId))
            //                 return false;
            //             }
            //             else{
            //                 await client.sendMessage(
            //                     Aelly.chatId,
            //                     GENERAL.SUDO_PERMISSION.format({ worktype: "private", groupName: Aelly.groupName ? Aelly.groupName : "private chat", commandName: Aelly.commandName }),
            //                     MessageType.text,
            //                     {
            //                         contextInfo: {
            //                             stanzaId: Aelly.chatId,
            //                             participant: Aelly.sender,
            //                             quotedMessage: {
            //                                 conversation: Aelly.body,
            //                             },
            //                         },
            //                     }
            //                 );
            //                 await Users.addUser(Aelly.chatId)
            //                 return false;
            //             }
        }
    } else {
        return true;
    }
}

export = clearance;