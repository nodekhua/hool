FROM node:carbon

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5000
RUN npm install -g serve

RUN npm run build
CMD serve -s dist -p 5000
