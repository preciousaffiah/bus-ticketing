FROM node:alpine

WORKDIR /server

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]