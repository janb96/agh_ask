FROM node:8
WORKDIR /app
COPY App ./
RUN npm install
RUN npm install axios --save
RUN npm install amqplib --save
CMD ["node", "send.js"]