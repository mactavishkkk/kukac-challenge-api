FROM node:16
WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
RUN npx prisma generate

COPY .env .env
RUN npm run build

EXPOSE 3000

COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

CMD ["./docker-entrypoint.sh", "npm", "run", "start:dev"]