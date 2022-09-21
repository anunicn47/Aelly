<p align="center">
  <img src="images/Aelly_Logo.png" height="400px"/>
</p>


# 💠[Aelly](https://myAelly.com/)💠
> Your Personal Assisstant, on WhatsApp!
---
![GitHub top language](https://img.shields.io/github/languages/top/AellyOfficial/Aelly) [![GitHub release](https://img.shields.io/github/release/AellyOfficial/Aelly.svg)](https://github.com/bkimminich/juice-shop/releases/latest)
 ![GitHub contributors](https://img.shields.io/github/contributors/AellyOfficial/Aelly) ![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/AellyOfficial/Aelly) ![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/AellyOfficial/Aelly) ![GitHub Repo stars](https://img.shields.io/github/stars/AellyOfficial/Aelly?style=social) ![GitHub repo size](https://img.shields.io/github/repo-size/AellyOfficial/Aelly)
 

![Docker Pulls](https://img.shields.io/docker/pulls/princemendiratta/Aelly?style=flat-square&label=Docker+Pulls) ![Docker Image Size](https://img.shields.io/docker/image-size/princemendiratta/Aelly?style=flat-square&label=Docker+Image+Size)

Aelly is an optimized and easy-to-use WhatsApp UserBot written in Node.js.

Utilize your personal chat assistant/group manager to make the most out of WhatsApp.   



## Documentation

[Documentation Link](https://myAelly.com/documentation)


## Tutorial

Here's a tutorial to set up Aelly on your own account in *less than 3 minutes.* For now, the Multi Device Bot can only be used locally, the tutorial for which is attached below.

[![How to deploy](https://img.shields.io/badge/How%20To-Deploy-red.svg?logo=Youtube)](https://www.youtube.com/watch?v=tGrjEZ3roY0&ab_channel=Aelly)

[![Multi Device](https://img.shields.io/badge/Host%20Multi%20Device%20bot%20on-Windows-red.svg?logo=Youtube)](https://youtu.be/NZy4sZqncjg&ab_channel=Aelly)


## Deployment

<b>Only local deployment is working for now!</b>

### Easiest Way

You can deploy Aelly in minimal time without any prior knowledge using this method.

1. Head over to Aelly's [Official website](https://myAelly.com/) and create an account on heroku using your email ID.
2. Once logged in, click on the "Deploy Aelly" button in the sidebar.
3. Scan the QR code shown using your WhatsApp account (3 dots on top right corner -> Linked devices -> LINK A DEVICE). Click on the 'Continue'      button once done.
4. Once the bot is linked to your account, you will come across a form which can be used to manage settings/permissions of Aelly. If required,    change the form fields. Then, click on the submit button.
5. Wait for 1-3 minutes for the bot to start. This is a one time process. Try using the '.alive' command in any of your chats to verify whether    your bot has been deployed succesfully.

Voila! You have deployed your bot in 5 easy steps. Once the bot has started successfully, you'll see a integration message on your whatsapp account.

### Manually on Heroku

<b>Deployment to heroku using the button is not working for now!</b>

You can deploy the bot the heroku yourself using the button below!

## ㅤㅤㅤᴅᴇᴘʟᴏʏ ᴏɴ ʜᴇʀᴏᴋᴜ​ 🚀
ㅤㅤㅤᴛʜᴇ ᴇᴀsɪᴇsᴛ ᴡᴀʏ ᴛᴏ ᴅᴇᴘʟᴏʏ ꜰᴀʟʟᴇɴ ʀᴏʙᴏᴛ​
<p align="center"><a href="https://heroku.com/deploy?template=https://github.com/anunicn47/Aelly"> <img src="https://img.shields.io/badge/Deploy%20To%20Heroku-black?style=for-the-badge&logo=heroku" width="220" height="38.45"/></a></p>

### Using Docker locally

To follow this method, you will need to have docker installed on your machine and have some experience using docker.

To host the bot on your own device using docker, follow the following steps on your terminal / command prompt -

```bash
wget -O Aelly.tar.gz https://github.com/AellyOfficial/Aelly/archive/refs/tags/v2.0.0-beta.tar.gz
tar -xvzf Aelly.tar.gz
cd Aelly-2.0.0-beta
docker build -t Aelly .
docker run --rm --name Aelly Aelly
```

This will create a container running Aelly. You'll have to scan the QR at least once.

### The GNU/Linux Legacy Way

To use this method, you will need ffmpeg, nodejs, npm installed on your device.

To run the bot on your device manually, you can use the following commands -

```bash
git clone https://github.com/AellyOfficial/Aelly.git
cd Aelly
yarn
npm start
```

## Scan QR Code again
If you're having issues when running locally it is recommended to scan the code again. To get the QR code again, follow these commands -
```
rm -rf Aelly.db session.data.json
npm start
```

## Support and Discussion groups

Feel free to post your queries or concerns on any of the discussion forums mentioned below:

[![Join WhatsApp Group](https://img.shields.io/badge/Join-WhatsApp%20Group-bl.svg?logo=WhatsApp)](https://chat.whatsapp.com/GPEHkFlspzOKpSBTsYx7Wt)

[![Join Telegram Group](https://img.shields.io/badge/Join-Telegram%20Group-blue.svg?logo=Telegram)](https://t.me/AellyChat)

[![Join Telegram Channel](https://img.shields.io/badge/Join-Telegram%20Channel-red.svg?logo=Telegram)](https://t.me/AellyOfficial)
  
  
  ### Heroku
  <p align="center"><a href="https://heroku.com/deploy?template=https://github.com/anunicn47/Aelly"> <img src="https://img.shields.io/badge/Deploy%20To%20Heroku-black?style=for-the-badge&logo=heroku" width="220" height="38.45"/></a></p>


## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Prince-Mendiratta"><img src="https://avatars.githubusercontent.com/u/54077356?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Prince Mendiratta</b></sub></a><br /><sub><i>Project Lead Developer</i></sub></td>
    <td align="center"><a href="https://github.com/Prashant-singla"><img src="https://avatars.githubusercontent.com/u/83973641?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Prashant Singla</b></sub></a><br /><sub><i>Core Developer</i></sub></td>
    <td align="center"><a href="https://github.com/Keshav-Pahwa"><img src="https://avatars.githubusercontent.com/u/83963387?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Keshav Pahwa</b></sub></a><br /><sub><i>Core Developer</i></sub></td>
    <td align="center"><a href="https://github.com/j0h4nn1410"><img src="https://avatars.githubusercontent.com/u/72455289?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Johann Jose</b></sub></a><br /><sub><i>Core Developer</i></sub></td>
    <td align="center"><a href="https://github.com/Mohit161220"><img src="https://avatars.githubusercontent.com/u/83974093?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mohit Singh Rana</b></sub></a><br /><sub><i>Core Developer</i></sub></td>
    <td align="center"><a href="https://github.com/thegeek-dev"><img src="https://avatars.githubusercontent.com/u/70193222?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Neeraj Patel</b></sub></a><br /><sub><i>Moderator</i></sub></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->



## Inspiration

- Baileys Library

- Yusuf Usta 

- [X-tra-Telegram](https://github.com/Prince-Mendiratta/X-tra-Telegram)

## Copyright & License
- Copyright (C) 2021 - 2022 by [AellyOfficial](https://github.com/AellyOfficial)

- Licensed under the terms by [GNU GENERAL PUBLIC LICENSE](https://github.com/AellyOfficial/Aelly/blob/main/LICENSE)

## Legal
This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by WhatsApp or any of its affiliates or subsidiaries. This is an independent and unofficial software. Use at your own risk.
