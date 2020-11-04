from django.apps import AppConfig


class BaseConfig(AppConfig):
    name = "base"

    def ready(self):
        import django_react.base.signals
