FROM node:latest

WORKDIR /usr/src/app
COPY package*.json .

ARG ENV
RUN if [ "$ENV" = "production" ]; \
    then npm ci --only=production; \
    else npm ci; \
    fi \ 
    && npm i ts-node -g

COPY . .