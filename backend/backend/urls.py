from django.contrib import admin
from django.urls import path,include
from api.views import CreateUserview
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from api.views import FilteredProviderList ,SmartMultiLanguageSearchView
from api import views
# ,ai_search

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/",CreateUserview.as_view(),name='register'),
    
    path("api/token/",TokenObtainPairView.as_view(),name="get_token"),

    path("api/token/refresh/",TokenRefreshView.as_view(),name="refresh"),

    path("api-auth/",include("rest_framework.urls")),


    path('api/providers/', FilteredProviderList.as_view(), name='provider-filter'),
    path('api/smart-search/', SmartMultiLanguageSearchView.as_view(), name='smart-search'),


    path('api/initiate-call/', views.initiate_call, name='initiate_call'),
    path('api/call-history/', views.call_history, name='call_history'),
    path('api/mark-seen/', views.mark_notifications_seen, name='mark_seen'),  
    path("api/",include("api.urls")),

 


]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
