"""
ASGI config for django_react project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/asgi/
"""

import os
import sys
from os.path import join
import django
from channels.routing import get_default_application

base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_react.settings')
sys.path.append(join(base_dir))
django.setup()
application = get_default_application()
