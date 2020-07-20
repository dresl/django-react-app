FROM python:3.7-alpine

# install PostgreSQL client
RUN  apk add --no-cache libffi-dev postgresql-libs git jpeg-dev zlib-dev gettext-dev && apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev

COPY ./requirements.txt /app/

WORKDIR /app

# install requirements
RUN pip install -r requirements.txt

# cleanup
RUN apk --purge del .build-deps

COPY . /app/

EXPOSE 8000

CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "django_react.asgi:application"]
