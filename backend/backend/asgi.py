
# # # import os
# # # from django.core.asgi import get_asgi_application
# # # from channels.routing import ProtocolTypeRouter, URLRouter
# # # from channels.auth import AuthMiddlewareStack
# # # from channels.layers import get_channel_layer
# # # import backend.routing
# # # os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# # # application = ProtocolTypeRouter({
# # #     "http": get_asgi_application(),
# # #     "websocket": AuthMiddlewareStack(
# # #         URLRouter(
# # #             backend.routing.websocket_urlpatterns
# # #         )
# # #     ),
# # # })
 


# # import os
# # import django
# # from django.core.asgi import get_asgi_application

# # from channels.routing import get_default_application

# # os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
# # django.setup()

# # # Now safely import after apps are loaded
# # import backend.routing

# # from channels.routing import ProtocolTypeRouter, URLRouter
# # from channels.auth import AuthMiddlewareStack

# # application = ProtocolTypeRouter({
# #     "http": get_asgi_application(),
# #     "websocket": AuthMiddlewareStack(
# #         URLRouter(
# #             backend.routing.websocket_urlpatterns
# #         )
# #     ),
# # })


# import os
# import django
# from django.core.asgi import get_asgi_application

# # MUST COME FIRST - before any imports
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
# django_asgi_app = get_asgi_application()

# # Now safe to import other things
# from channels.routing import ProtocolTypeRouter, URLRouter
# import backend.routing  # or your routing config

# application = ProtocolTypeRouter({
#     "http": django_asgi_app,
#     "websocket": URLRouter(
#         backend.routing.websocket_urlpatterns
#     ),
# })
import os
from django.core.asgi import get_asgi_application

# 1. SET ENV FIRST
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# 2. INITIALIZE DJANGO HERE (CRITICAL!)
django_application = get_asgi_application()

# 3. ONLY NOW IMPORT CHANNELS STUFF
from channels.routing import ProtocolTypeRouter, URLRouter
from . import routing  # your websocket routes

application = ProtocolTypeRouter({
    "http": django_application,
    "websocket": URLRouter(
        routing.websocket_urlpatterns
    ),
})