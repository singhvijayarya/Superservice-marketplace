from django.contrib import admin
from .models import SeekerProfile, ProviderProfile,Help,ReviewRating

# Register your models here.

admin.site.register(SeekerProfile)
admin.site.register(ProviderProfile)
admin.site.register(Help)
admin.site.register(ReviewRating)