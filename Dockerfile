FROM node:16-alpine
WORKDIR /home

RUN apk update

RUN apk --no-cache add python3 make g++

RUN npm install -g nodemon
COPY ./package* ./
RUN npm install -i

CMD ["npm", "test"]