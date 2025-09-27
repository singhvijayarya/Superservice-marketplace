from django .urls import path 
from . import views
from .views import HelpListCreate, HelpRemove, CreateUserview, search_service_providers, SeekerFormView, ProviderFormView,SeekerProfileDetailView,providerProfileDetailView
from .views import  UpdateProviderProfile,UpdateSeekerProfile
from .views import AdminView
from .views import ToggleProviderStatusByUsernameView,ReviewByUsernameView,ProviderReviewSummary
# ,SmartSearchView



urlpatterns=[
    path('admin/', AdminView.as_view(), name='admindashboard'),
    path("help/",views.HelpListCreate.as_view(),name="help-list"),
    path("help/remove/<int:pk>/",views.HelpRemove.as_view(),name="remove-help"),
    path("api/service-providers/",search_service_providers ,name="service-providers"),
     path("seeker-form/", SeekerFormView.as_view(), name="seeker-form"),
    path("provider-form/", ProviderFormView.as_view(), name="provider-form"),
    path("api/register/", CreateUserview.as_view(), name="register"),
    path('seeker-profile/', SeekerProfileDetailView.as_view(), name='seeker-profile'),
    path('provider-profile/', providerProfileDetailView.as_view(), name='provider-profile'),
    path('provider/<str:username>/toggle-status/', ToggleProviderStatusByUsernameView.as_view(), name='toggle-provider-status-by-username'),
    path('review/<str:username>/', ReviewByUsernameView.as_view(), name='review-by-username'),
    path('review/<str:username>/summary/', ProviderReviewSummary.as_view(), name='review-summary'),
    # path('api/smart-search/', SmartSearchView.as_view(), name='smart-search'),
    path('book-provider/', views.book_provider),
    path('get-bookings/', views.get_bookings),
    path('cancel-booking/<int:booking_id>/', views.cancel_booking),




    path("seeker/update/", views.UpdateSeekerProfile.as_view(), name="update-seeker"),
    path("provider/update/", views.UpdateProviderProfile.as_view(), name="update-provider"),
] 