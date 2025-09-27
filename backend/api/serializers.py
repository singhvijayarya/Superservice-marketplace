from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Help, SeekerProfile, ProviderProfile, ServiceProvider,ReviewRating
from .models import Booking



class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class HelpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Help
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}


class ServiceProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProvider
        fields = "__all__"

class SeekerProfileSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    username = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username
    class Meta:
        model = SeekerProfile
        fields = ['user','username','email', 'phone', 'address', 'profile_picture']

class ProviderProfileSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # GET ke liye: readable username
    username = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username

    class Meta:
        model = ProviderProfile
        fields = ['user', 'username', 'role', 'phone', 'address', 'profile_picture','status']
        extra_kwargs = {
            'status': {'required': False}  
        }
class ReviewRatFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewRating
        fields = ['subject', 'review', 'rating']

class BookingSerializer(serializers.ModelSerializer):
    provider = serializers.CharField(source='provider.username')
    seeker = serializers.CharField(source='seeker.username')

    class Meta:
        model = Booking
        fields = ['id', 'seeker', 'provider', 'booked_at', 'status']