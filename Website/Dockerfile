FROM node:8
WORKDIR /app
COPY App ./
RUN npm install
RUN npm install mongoose --save
CMD ["npm", "start"]