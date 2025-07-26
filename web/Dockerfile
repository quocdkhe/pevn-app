FROM node:22-alpine

WORKDIR /src/web

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
