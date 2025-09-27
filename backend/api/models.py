from django.db import models
from django.contrib.auth.models import User
# Create your models here.
# from django.contrib.postgres.fields import ArrayField




class Help(models.Model):
    title=models.CharField(max_length=100)
    content=models.TextField()
    created_at=models.DateField(auto_now_add=True)
    author =models.ForeignKey(User,on_delete=models.CASCADE,related_name="help")
    def __str__(self):
        return self.title

class ServiceProvider(models.Model):
    name = models.CharField(max_length=100)
    service_field = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.name} - {self.service_field}"
    
    

class SeekerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.TextField() 
    profile_picture = models.ImageField(upload_to='seekers/')
     

class ProviderProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    profile_picture = models.ImageField(upload_to='providers/')
    
    status = models.CharField(
    max_length=10,
    choices=[('online', 'Online'), ('offline', 'Offline')],
    default='offline',
    blank=True  # 👈 IMPORTANT!
    )

class CallNotification(models.Model):
    seeker = models.ForeignKey(User, related_name='sent_calls', on_delete=models.CASCADE)
    provider = models.ForeignKey(User, related_name='received_calls', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_answered = models.BooleanField(default=False)
    is_seen = models.BooleanField(default=False)


class ReviewRating(models.Model):   
    #provider unknown set it,
    provider = models.ForeignKey(ProviderProfile,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    subject = models.CharField(max_length=100,blank=True)
    review = models.TextField(max_length=500,blank=True)
    rating = models.FloatField()
    
    ip=models.CharField(max_length=20,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.provider.user.username} - {self.subject}"
    

class Booking(models.Model):
    seeker = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seeker_bookings')
    provider = models.ForeignKey(User, on_delete=models.CASCADE, related_name='provider_bookings')
    booked_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default="booked")  # optional: 'booked', 'cancelled'

    def __str__(self):
        return f"{self.seeker.username} → {self.provider.username}"





# class ServiceProvider(models.Model):
#     SERVICE_CHOICES = [
#         ('electrician', 'Electrician'),
#         ('plumber', 'Plumber'),
#         ('ac_repair', 'AC Repair'),
#         ('carpenter', 'Carpenter'),
#         ('mechanic', 'Mechanic'),
#         ('personal', 'Personal'),
#         ('health', 'Health'),
#         ('education', 'Education'),
#         ('business', 'Business'),
#         ('furniture', 'Furniture'),
#         ('transport', 'Transport'),
#         ('event', 'Event'),
#         ('safety', 'Safety'),
#     ]
    
#     name = models.CharField(max_length=100)
#     service_type = models.CharField(max_length=20, choices=SERVICE_CHOICES)
#     location = models.CharField(max_length=100)
#     rating = models.FloatField(default=0)
#     review_count = models.IntegerField(default=0)
#     description = models.TextField(blank=True)
#     keywords = ArrayField(models.CharField(max_length=30), blank=True, default=list)
    
#     def __str__(self):
#         return f"{self.name} - {self.get_service_type_display()}"
    
#     class Meta:
#         indexes = [
#             models.Index(fields=['service_type']),
#             models.Index(fields=['location']),
#             models.Index(fields=['rating']),
#         ]