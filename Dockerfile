FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ENV PORT=3000


RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]
