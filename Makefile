VERSION = "0.1.0"
ORGANIZATION ?= "dresl"

help:
	@echo "Django react app - help"
	@echo "    build_assets           Build js/css/(svg, png, jpg...) using npm"

all: build publish

run:
	. venv/bin/activate && ./venv/bin/python manage.py runserver

build_assets:
	rm assets/assets/*
	npm run build-assets

build:
	docker build -t $(ORGANIZATION)/django-react:$(VERSION) -f ./Dockerfile .
	docker tag $(ORGANIZATION)/django-react:$(VERSION) $(ORGANIZATION)/django-react:latest

publish:
	docker push $(ORGANIZATION)/django-react:$(VERSION)
	docker push $(ORGANIZATION)/django-react:latest
