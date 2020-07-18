# Django React app

- django, Rest API, webpack (craco), web sockets, react, AntDesign, ...

## Installation

### Sync python server

It's recommended to create a virtual environment.

```shell script
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic
python manage runserver
```

### Run frontend

```
cd django-react-frontend
npm install
npm start
```
