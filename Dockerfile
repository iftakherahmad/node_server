FROM node:14
RUN mkdir /src/user/app
WORKDIR /src/user/app
COPY package*json ./
copy . .
RUN npm install
CMD ["node","index.js]