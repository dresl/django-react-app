from django.contrib import admin
from .models import ChatGroup, ChatMessage


@admin.register(ChatGroup)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")


@admin.register(ChatMessage)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ("date", "user")

