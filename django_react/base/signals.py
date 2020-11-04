from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from chat.models import ChatGroup


@receiver(post_save, sender=get_user_model())
def assign_global_chat_room(sender, instance, created, **kwargs):
    if created:
        global_room = ChatGroup.objects.get(slug="global")
        instance.chat_groups.add(global_room)
