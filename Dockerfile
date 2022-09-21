FROM princemendiratta/Aelly:latest

WORKDIR /

COPY . /Aelly

WORKDIR /Aelly

RUN git init --initial-branch=multi-device

RUN git remote add origin https://github.com/AellyOfficial/Aelly.git

RUN git fetch origin multi-device

RUN git reset --hard origin/multi-device

RUN yarn

# RUN cp -r /root/Baileys/lib /Aelly/node_modules/@adiwajshing/baileys/

CMD [ "npm", "start"]