# Django React app

- webpack, web sockets, react, AntDesign, ...

## Installation

### Build javascript and CSS files (using *webpack* and *babel*)

```shell script
npm install
npm run build-assets
```

### Sync python server

It's recommended to create a virtual environment.

```shell script
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic
python manage runserver
```
