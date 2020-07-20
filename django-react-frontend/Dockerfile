FROM node:14 as builder
WORKDIR /app
RUN npm install -g serve@10.1.1
COPY ./build /app

FROM nginx:stable
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/ /app/
