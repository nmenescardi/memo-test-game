FROM node:18.2.0

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN rm -rf .next && npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
