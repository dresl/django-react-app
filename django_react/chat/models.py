from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class ChatGroup(models.Model):

    def __str__(self):
        return self.name

    name = models.CharField(verbose_name="Group name", max_length=255)
    slug = models.SlugField(verbose_name="Group slug", max_length=255)
    users = models.ManyToManyField(User, verbose_name="Users", related_name="chat_groups")

    class Meta:
        verbose_name = "Chat group"
        verbose_name_plural = "Chat groups"
        ordering = ["name"]


class ChatMessage(models.Model):

    def __str__(self):
        return self.text[:15]

    text = models.TextField(verbose_name="Message text", max_length=1024)
    msg_type = models.CharField(verbose_name="Message type", default='text', max_length=100)
    date = models.DateTimeField(verbose_name="Date", default=timezone.now)
    chat = models.ForeignKey(ChatGroup, verbose_name="Chat group", related_name="messages", on_delete=models.DO_NOTHING)
    user = models.ForeignKey(User, verbose_name="Sender", related_name='users', on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "Messages"
        ordering = ["date"]
