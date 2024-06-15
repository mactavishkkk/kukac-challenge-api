FROM node:16
WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
COPY .env .env
RUN npm run build

EXPOSE 3000

CMD ["./docker-entrypoint.sh", "npm", "run", "start:prod"]