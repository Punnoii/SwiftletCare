FROM node:22-alpine

WORKDIR /usr/src/app

# copy  package file (to use layer cache of docker)
COPY package*.json ./

RUN npm install

# copy all source code 
COPY . .

EXPOSE 3000

CMD [ "node" , "src/server.js"]

