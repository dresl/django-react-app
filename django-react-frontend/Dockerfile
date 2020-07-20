FROM node:14 as builder
WORKDIR /app
COPY ./build /app

FROM nginx:stable
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/ /app/
