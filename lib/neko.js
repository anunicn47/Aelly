// Disabled till fix can be found.

// const { MessageType } = require("@adiwajshing/baileys");
// const inputSanitization = require("../sidekick/input-sanitization");
// const String = require("../lib/db.js");
// const got = require("got");
// const REPLY = String.neko;
// module.exports = {
//     name: "neko",
//     description: REPLY.DESCRIPTION,
//     extendedDescription: REPLY.EXTENDED_DESCRIPTION,
//     demo: {
//         isEnabled: true,
//         text: '.neko #include <iostream> \nint main() \n{\n   std::cout << "Hello Aelly!"; \n   return 0;\n}',
//     },
//     async handle(client, chat, Aelly, args) {
//         try {
//             if (args.length === 0 && !Aelly.isReply) {
//                 await client.sendMessage(
//                     Aelly.chatId,
//                     REPLY.ENTER_TEXT,
//                     MessageType.text
//                 ).catch(err => inputSanitization.handleError(err, client, Aelly));
//                 return;
//             }
//             const processing = await client.sendMessage(
//                 Aelly.chatId,
//                 REPLY.PROCESSING,
//                 MessageType.text
//             ).catch(err => inputSanitization.handleError(err, client, Aelly));
//             if (!Aelly.isReply) {
//                 var json = {
//                     content: Aelly.body.replace(
//                         Aelly.body[0] + Aelly.commandName + " ",
//                         ""
//                     ),
//                 };
//             } else {
//                 var json = {
//                     content: Aelly.replyMessage.replace(
//                         Aelly.body[0] + Aelly.commandName + " ",
//                         ""
//                     ),
//                 };
//             }
//             let text = await got.post("https://nekobin.com/api/documents", {
//                 json,
//             });
//             json = JSON.parse(text.body);
//             neko_url = "https://nekobin.com/" + json.result.key;
//             client.sendMessage(Aelly.chatId, neko_url, MessageType.text).catch(err => inputSanitization.handleError(err, client, Aelly));
//             return await client.deleteMessage(Aelly.chatId, {
//                 id: processing.key.id,
//                 remoteJid: Aelly.chatId,
//                 fromMe: true,
//             }).catch(err => inputSanitization.handleError(err, client, Aelly));
//         } catch (err) {
//             if (json.result == undefined) {
//                 await inputSanitization.handleError(
//                     err,
//                     client,
//                     Aelly,
//                     REPLY.TRY_LATER
//                 );
//             } else {
//                 await inputSanitization.handleError(err, client, Aelly);
//             }
//             return await client.deleteMessage(Aelly.chatId, {
//                 id: processing.key.id,
//                 remoteJid: Aelly.chatId,
//                 fromMe: true,
//             }).catch(err => inputSanitization.handleError(err, client, Aelly));
//         }
//     },
// };
