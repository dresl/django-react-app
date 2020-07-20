VERSION = "0.1.0"
ORGANIZATION ?= "dresl"

.PHONY: build

help:
	@echo "Django react app (frontend)"

all: build publish

build:
	@echo "Have you exported REACT_APP_API_URL variable? Pres any key to continue..."
	@read continue
	rm -rf ./build
	npm run build
	docker build -t $(ORGANIZATION)/django-react-frontend:$(VERSION) -f ./Dockerfile .
	docker tag $(ORGANIZATION)/django-react-frontend:$(VERSION) $(ORGANIZATION)/django-react-frontend:latest

publish:
	docker push $(ORGANIZATION)/django-react-frontend:$(VERSION)
	docker push $(ORGANIZATION)/django-react-frontend:latest
