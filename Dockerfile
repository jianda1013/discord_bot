FROM node:14-alpine
WORKDIR /home

RUN npm install -g nodemon
COPY ./package* ./
RUN npm install -i

CMD ["npm", "test"]