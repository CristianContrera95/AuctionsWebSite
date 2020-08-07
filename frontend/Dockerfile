# start from node 12 (last lts version at the moment)
FROM node:12-alpine
LABEL maintainer="cristiancontrera95@gmail.com"


# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm i

# add app
#COPY . ./

# RUN npm run build

# expose port that npm server use
EXPOSE 3000

# start in produccion mode
#CMD ["serve", "-s", "build", "-l", "3000"]
CMD ["npm", "start"]
