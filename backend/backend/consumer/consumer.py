
# import json
# import logging
# from django.utils import timezone
# from channels.generic.websocket import AsyncWebsocketConsumer
# from channels.db import database_sync_to_async
# from django.contrib.auth.models import User
# from api.models import ProviderProfile, CallNotification
# import json
# from channels.generic.websocket import AsyncWebsocketConsumer
# from channels.db import database_sync_to_async
# from django.contrib.auth.models import User
# from api.models import CallNotification, ProviderProfile


# logger = logging.getLogger(__name__)

# class TrackingConsumer(AsyncWebsocketConsumer):
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.username = None
#         self.room_group_name = None
#         self.user = None

#     async def connect(self):
#         try:
#             # Lazy import to avoid AppRegistryNotReady error
#             from django.contrib.auth.models import User  
#             from django.contrib.auth.models import AnonymousUser

#             # Extract username from the URL
#             self.username = self.scope["url_route"]["kwargs"].get("username")
#             self.user = self.scope["user"]

#             # Check if the user is authenticated
#             if not self.user.is_authenticated:
#                 await self.close(code=4001)
#                 return

#             if not self.username:
#                 await self.close(code=4000)
#                 return

#             self.room_group_name = f"track_{self.username}"

#             # Add the WebSocket to the channel group
#             await self.channel_layer.group_add(
#                 self.room_group_name,
#                 self.channel_name
#             )

#             # Accept the WebSocket connection
#             await self.accept()

#             # Send connection confirmation
#             await self.send(json.dumps({
#                 "type": "connection",
#                 "message": "WebSocket connection established",
#                 "status": "connected"
#             }))
#             logger.info(f"🔌 WebSocket connected for {self.username}")

#         except Exception as e:
#             logger.error(f"Connection error: {str(e)}")
#             await self.close(code=4003)

#     async def disconnect(self, close_code):
#         try:
#             # Remove WebSocket from the channel group
#             if self.room_group_name:
#                 await self.channel_layer.group_discard(
#                     self.room_group_name,
#                     self.channel_name
#                 )
#             logger.info(f"❌ Disconnected {self.username} with code {close_code}")

#         except Exception as e:
#             logger.error(f"Error during disconnect: {str(e)}")

#     async def receive(self, text_data):
#         try:
#             data = json.loads(text_data)
#             logger.debug(f"Received data from {self.username}: {data}")

#             # Validate the incoming data
#             if not all(k in data for k in ['action', 'latitude', 'longitude']):
#                 await self.send(json.dumps({
#                     "error": "Invalid message format",
#                     "required": ["action", "latitude", "longitude"]
#                 }))
#                 return

#             # Send the location update to the channel group
#             await self.channel_layer.group_send(
#                 self.room_group_name,
#                 {
#                     "type": "location_update",
#                     "data": {
#                         **data,
#                         "username": self.username,
#                         "timestamp": timezone.now().isoformat()
#                     }
#                 }
#             )

#         except json.JSONDecodeError:
#             await self.send(json.dumps({"error": "Invalid JSON"}))
#         except Exception as e:
#             logger.error(f"Error processing message: {str(e)}")
#             await self.send(json.dumps({"error": str(e)}))

#     async def location_update(self, event):
#         try:
#             # Send location update to WebSocket
#             await self.send(text_data=json.dumps(event["data"]))

#         except Exception as e:
#             logger.error(f"Error sending location update: {str(e)}")

# #>>>>>>>>>>>>>>>>>>>>>>>> vedio call 

# class VideoCallConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#          from django.contrib.auth.models import User  
#          self.username = self.scope['user'].username
#          await self.channel_layer.group_add(
#             f"user_{self.username}",
#             self.channel_name
#             )
#          if await self.is_provider():
#             await self.update_provider_status('online')
#          await self.accept()

#     async def disconnect(self, close_code):
#         if await self.is_provider():
#             await self.update_provider_status('offline')
#         await self.channel_layer.group_discard(
#            f"user_{self.username}",
#             self.channel_name
#         )

#     async def receive(self, text_data):
#         data = json.loads(text_data)
#         action = data.get('action')
        
#         if action == 'initiate_call':
#             await self.handle_initiate_call(data)
#         elif action == 'call_response':
#             await self.handle_call_response(data)
#         elif action == 'webrtc_signal':
#             await self.handle_webrtc_signal(data)
#         elif action == 'mark_seen':
#             await self.mark_notifications_seen(data['notification_ids'])

#     async def handle_initiate_call(self, data):
#         provider_username = data['provider_username']
#         provider = await self.get_user(provider_username)
#         is_online = await self.check_provider_online(provider)
        
#         if is_online:
#             await self.channel_layer.group_send(
#                 f"user_{provider_username}",
#                 {
#                     'type': 'call_notification',
#                     'action': 'incoming_call',
#                     'seeker_name': self.user.username,
#                     'call_id': data['call_id']
#                 }
#             )
#         else:
#             await self.create_call_notification(provider, False)
#             await self.send(json.dumps({
#                 'action': 'call_failed',
#                 'message': 'Provider is offline. Notification sent.'
#             }))

#     async def handle_call_response(self, data):
#         seeker_id = data['seeker_id']
#         if data['accepted']:
#             room_id = f"call_{seeker_id}_{self.user.id}"
#             await self.channel_layer.group_send(
#                 f"user_{seeker_id}",
#                 {
#                     'type': 'call_notification',
#                     'action': 'call_accepted',
#                     'room_id': room_id,
#                     'provider_name': self.user.username
#                 }
#             )
#             await self.create_call_notification(self.user, True)
#         else:
#             await self.channel_layer.group_send(
#                 f"user_{seeker_id}",
#                 {
#                     'type': 'call_notification',
#                     'action': 'call_rejected'
#                 }
#             )

#     async def call_notification(self, event):
#         await self.send(json.dumps(event))

#     @database_sync_to_async
#     def is_provider(self):
#         return hasattr(self.user, 'providerprofile')

#     @database_sync_to_async
#     def update_provider_status(self, status):
#         ProviderProfile.objects.filter(user=self.user).update(status=status)

#     @database_sync_to_async
#     def get_user(self, username):
#         return User.objects.get(username=username)

#     @database_sync_to_async
#     def check_provider_online(self, provider):
#         return ProviderProfile.objects.get(user=provider).status == 'online'

#     @database_sync_to_async
#     def create_call_notification(self, provider, is_answered):
#         CallNotification.objects.create(
#             seeker=self.user,
#             provider=provider,
#             is_answered=is_answered
#         )

#     @database_sync_to_async
#     def mark_notifications_seen(self, notification_ids):
#         CallNotification.objects.filter(
#             id__in=notification_ids,
#             provider=self.user
#         ).update(is_seen=True)
import json
import logging
from django.utils import timezone
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from api.models import ProviderProfile, CallNotification
logger = logging.getLogger(__name__)

# ----------------------------- #
# TRACKING CONSUMER
# ----------------------------- #
class TrackingConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.username = None
        self.room_group_name = None
        self.user = None

    async def connect(self):
        try:
            self.username = self.scope["url_route"]["kwargs"].get("username")
            self.user = self.scope["user"]

            if not self.user.is_authenticated or not self.username:
                await self.close(code=4001)
                return

            self.room_group_name = f"track_{self.username}"

            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )

            await self.accept()

            await self.send(json.dumps({
                "type": "connection",
                "message": "WebSocket connection established",
                "status": "connected"
            }))
            logger.info(f"🔌 Connected to room {self.room_group_name}")

        except Exception as e:
            logger.error(f"Connection failed: {str(e)}")
            await self.close(code=4003)

    async def disconnect(self, close_code):
        try:
            if self.room_group_name:
                await self.channel_layer.group_discard(
                    self.room_group_name,
                    self.channel_name
                )
            logger.info(f"❌ Disconnected {self.username}")
        except Exception as e:
            logger.error(f"Disconnect error: {str(e)}")

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            if not all(k in data for k in ['action', 'latitude', 'longitude']):
                await self.send(json.dumps({
                    "error": "Invalid message format",
                    "required": ["action", "latitude", "longitude"]
                }))
                return

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "location_update",
                    "data": {
                        **data,
                        "username": self.username,
                        "timestamp": timezone.now().isoformat()
                    }
                }
            )

        except json.JSONDecodeError:
            await self.send(json.dumps({"error": "Invalid JSON"}))
        except Exception as e:
            logger.error(f"Receive error: {str(e)}")
            await self.send(json.dumps({"error": str(e)}))

    async def location_update(self, event):
        try:
            await self.send(text_data=json.dumps(event["data"]))
        except Exception as e:
            logger.error(f"Send update error: {str(e)}")

# ----------------------------- #
# VIDEO CALL CONSUMER
# ----------------------------- #
class VideoCallConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        from django.contrib.auth.models import User 
        self.user = self.scope["user"]
        self.username = self.user.username
        user = User.objects.get(...)
        if not self.user.is_authenticated:
            await self.close(code=4001)
            return

        await self.channel_layer.group_add(
            f"user_{self.username}",
            self.channel_name
        )

        if await self.is_provider():
            await self.update_provider_status('online')

        await self.accept()
        logger.info(f"🎥 Video call socket connected for {self.username}")

    async def disconnect(self, close_code):
        if await self.is_provider():
            await self.update_provider_status('offline')

        await self.channel_layer.group_discard(
            f"user_{self.username}",
            self.channel_name
        )
        logger.info(f"📴 Video call socket disconnected for {self.username}")

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            action = data.get('action')

            if action == 'initiate_call':
                await self.handle_initiate_call(data)
            elif action == 'call_response':
                await self.handle_call_response(data)
            elif action == 'webrtc_signal':
                await self.handle_webrtc_signal(data)
            elif action == 'mark_seen':
                await self.mark_notifications_seen(data['notification_ids'])
        except Exception as e:
            logger.error(f"Error handling action: {str(e)}")

    async def handle_initiate_call(self, data):
        provider_username = data.get('provider_username')
        provider = await self.get_user(provider_username)

        if await self.check_provider_online(provider):
            await self.channel_layer.group_send(
                f"user_{provider_username}",
                {
                    'type': 'call_notification',
                    'action': 'incoming_call',
                    'seeker_name': self.username,
                    'call_id': data['call_id']
                }
            )
        else:
            await self.create_call_notification(provider, False)
            await self.send(json.dumps({
                'action': 'call_failed',
                'message': 'Provider is offline. Notification sent.'
            }))

    async def handle_call_response(self, data):
        seeker_id = data['seeker_id']
        if data['accepted']:
            room_id = f"call_{seeker_id}_{self.user.id}"
            await self.channel_layer.group_send(
                f"user_{seeker_id}",
                {
                    'type': 'call_notification',
                    'action': 'call_accepted',
                    'room_id': room_id,
                    'provider_name': self.username
                }
            )
            await self.create_call_notification(self.user, True)
        else:
            await self.channel_layer.group_send(
                f"user_{seeker_id}",
                {
                    'type': 'call_notification',
                    'action': 'call_rejected'
                }
            )

    async def handle_webrtc_signal(self, data):
        # Send WebRTC signal to other peer
        receiver = data.get('receiver')
        await self.channel_layer.group_send(
            f"user_{receiver}",
            {
                'type': 'webrtc_signal',
                'signal': data['signal'],
                'from': self.username
            }
        )

    async def webrtc_signal(self, event):
        await self.send(json.dumps(event))

    async def call_notification(self, event):
        await self.send(json.dumps(event))

    @database_sync_to_async
    def is_provider(self):
        return hasattr(self.user, 'providerprofile')

    @database_sync_to_async
    def update_provider_status(self, status):
        ProviderProfile.objects.filter(user=self.user).update(status=status)

    @database_sync_to_async
    def get_user(self, username):
        return User.objects.get(username=username)

    @database_sync_to_async
    def check_provider_online(self, provider):
        return ProviderProfile.objects.get(user=provider).status == 'online'

    @database_sync_to_async
    def create_call_notification(self, provider, is_answered):
        CallNotification.objects.create(
            seeker=self.user,
            provider=provider,
            is_answered=is_answered
        )

    @database_sync_to_async
    def mark_notifications_seen(self, notification_ids):
        CallNotification.objects.filter(
            id__in=notification_ids,
            provider=self.user
        ).update(is_seen=True)
