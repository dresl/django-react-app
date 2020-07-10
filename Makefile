# simple makefile

help:
	@echo "Django chat app - help"

run:
	python manage.py runserver

build_assets:
	npm run build-assets
