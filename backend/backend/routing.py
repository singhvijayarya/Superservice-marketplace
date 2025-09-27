

from django.urls import re_path
from .consumer import TrackingConsumer,VideoCallConsumer


websocket_urlpatterns = [
    re_path(r'ws/track/(?P<username>\w+)/$', TrackingConsumer.as_asgi()),

    re_path(r'ws/video-call/$', VideoCallConsumer.as_asgi()),

]

