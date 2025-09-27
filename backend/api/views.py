import spacy
import logging
import re
from langdetect import detect
from deep_translator import GoogleTranslator
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, HelpSerializer, SeekerProfileSerializer, ProviderProfileSerializer,ReviewRatFormSerializer
from .models import Help, ServiceProvider,ReviewRating
from django.http import JsonResponse
from .models import ProviderProfile,SeekerProfile,CallNotification
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from .permissions import IsSpecificAdmin
from django.db.models import Avg ,Count 
from django.conf import settings 
import os
import uuid




class AdminView(APIView):
    permission_classes = [IsSpecificAdmin]

    def get(self, request):
        providers = ProviderProfile.objects.all()
        seekers = SeekerProfile.objects.all()

        provider_serializer = ProviderProfileSerializer(providers, many=True)
        seeker_serializer = SeekerProfileSerializer(seekers, many=True)

        return Response({
            "providers": provider_serializer.data,
            "seekers": seeker_serializer.data
        })
    
class CreateUserview(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

#>>>>>>>>>>>>> vedio call

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def initiate_call(request):
    provider_username = request.data.get('provider_username')
    call_id = f"call_{request.user.username}_{provider_username}_{uuid.uuid4().hex[:8]}"
    return Response({
        'call_id': call_id,
        'provider_username': provider_username
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def call_history(request):
    notifications = CallNotification.objects.filter(
        provider=request.user
    ).select_related('seeker').order_by('-timestamp')
    
    data = [{
        'id': n.id,
        'seeker_username': n.seeker.username,
        'profile_picture': n.seeker.seekerprofile.profile_picture.url if hasattr(n.seeker, 'seekerprofile') else None,
        'timestamp': n.timestamp,
        'answered': n.is_answered,
        'seen': n.is_seen
    } for n in notifications]
    
    return Response(data)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_notifications_seen(request):
    notification_ids = request.data.get('notification_ids', [])
    
    # Update notifications as seen
    updated = CallNotification.objects.filter(
        id__in=notification_ids,
        provider=request.user,
        is_seen=False
    ).update(is_seen=True)
    
    return Response({
        'status': 'success',
        'marked_seen': updated
    })
#>>>>>>>>>>>>>>>>




class HelpListCreate(generics.ListCreateAPIView):
    serializer_class = HelpSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Help.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class HelpRemove(generics.DestroyAPIView):
    serializer_class = HelpSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Help.objects.filter(author=self.request.user)


def search_service_providers(request):
    query = request.GET.get("query", "")
    if query:
        providers = ServiceProvider.objects.filter(service_field__icontains=query)
    else:
        providers = ServiceProvider.objects.all()
    data = list(providers.values("id", "name", "service_field", "location"))
    return JsonResponse(data, safe=False)


class SeekerFormView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        data = request.data.copy()
        data['email'] = user.email
        # Check if profile already exists
        if SeekerProfile.objects.filter(user=user).exists():
            return Response(
                {"error": "Seeker profile already exists for this user."},
                status=status.HTTP_400_BAD_REQUEST
            )
        #  Handle form data
        serializer = SeekerProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            profile = serializer.save()
            #  Use correct field name
            profile_pic_url = (
                request.build_absolute_uri(profile.profile_picture.url)
                if profile.profile_picture else None
            )
            return Response({
                "message": "Seeker profile created",
                "profile_picture": profile_pic_url,
                "user":profile.user.username,
                "email":profile.email,
                "phone":profile.phone,
                "address":profile.address,
            }, status=201)
        return Response(serializer.errors, status=400)
    
class SeekerProfileDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            seeker_profile = SeekerProfile.objects.get(user=user)
            serializer = SeekerProfileSerializer(seeker_profile, context={'request': request})
            
            # Generate full image URL
            profile_pic_url = (
                request.build_absolute_uri(seeker_profile.profile_picture.url)
                if seeker_profile.profile_picture else None
            )

            # Add extra fields to response
            response_data = serializer.data
            response_data["profile_picture"] = profile_pic_url

            return Response(response_data, status=200)

        except SeekerProfile.DoesNotExist:
            return Response({"error": "Seeker profile not found."}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class ProviderFormView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        # ✅ Already exist check
        if ProviderProfile.objects.filter(user=user).exists():
            return Response(
                {"error": "Provider profile already exists for this user."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ProviderProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            profile = serializer.save()
            profile_pic_url = (
                request.build_absolute_uri(profile.profile_picture.url)
                if profile.profile_picture else None
            )
            return Response({
                "message": "Provider profile created",
                "profile_picture": profile_pic_url,
                "user":profile.user.username,
                "role":profile.role,
                "phone":profile.phone,
                "address":profile.address,
            }, status=201)

        return Response(serializer.errors, status=400)
    

class providerProfileDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        try:
            provider_profile = ProviderProfile.objects.get(user=user)
            serializer = ProviderProfileSerializer(provider_profile, context={'request': request})
         # Generate full image URL
            profile_pic_url = (
                request.build_absolute_uri(provider_profile.profile_picture.url)
                if provider_profile.profile_picture else None
            )
            response_data = serializer.data
            response_data["profile_picture"] = profile_pic_url

            return Response(response_data, status=200)
        except ProviderProfile.DoesNotExist:
            return Response({"error": "Provider Profile  not found."}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        
class ToggleProviderStatusByUsernameView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, username):
        try:
            provider = ProviderProfile.objects.get(user__username=username, user=request.user)
            status = request.data.get("status")
            
            if status not in ["online", "offline"]:
                return Response({"error": "Invalid status"}, status=400)

            provider.status = status
            provider.save()
            return Response({"message": f"Status set to {status}"})
        
        except ProviderProfile.DoesNotExist:
            return Response({"error": "Provider not found"}, status=404)
# //profile update not work from here---->
class UpdateSeekerProfile(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        profile = get_object_or_404(SeekerProfile, user=request.user)
        serializer = SeekerProfileSerializer(profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Seeker profile updated"})
        return Response(serializer.errors, status=400)

class UpdateProviderProfile(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        profile = get_object_or_404(ProviderProfile, user=request.user)
        serializer = ProviderProfileSerializer(profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Provider profile updated"})
        return Response(serializer.errors, status=400)

# <-----to here 


class ReviewByUsernameView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, username):
        try:
            provider_user = User.objects.get(username=username)
            provider_profile = ProviderProfile.objects.get(user=provider_user)
        except User.DoesNotExist:
            return Response({"error": "Provider user not found."}, status=status.HTTP_404_NOT_FOUND)
        except ProviderProfile.DoesNotExist:
            return Response({"error": "Provider profile not found."}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        data['provider'] = provider_profile.user  # ForeignKey needs ID
        data['user'] = request.user

        serializer = ReviewRatFormSerializer(data=data)

        if serializer.is_valid():
            # Get IP address
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            ip = x_forwarded_for.split(',')[0] if x_forwarded_for else request.META.get('REMOTE_ADDR')

            review = serializer.save(provider=provider_profile, user=request.user, ip=ip)
            return Response({
                "message": "Review submitted successfully.",
                "data": ReviewRatFormSerializer(review).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ProviderReviewSummary(APIView):
    permission_classes = [AllowAny]

    def get(self, request, username):
        print(f"Fetching review summary for {username}")
        try:
            user = User.objects.get(username=username)
            provider = ProviderProfile.objects.get(user=user)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except ProviderProfile.DoesNotExist:
            return Response({"error": "Provider profile not found"}, status=status.HTTP_404_NOT_FOUND)

        reviews = ReviewRating.objects.filter(provider=provider)
        total_reviews = reviews.count()
        avg_rating = round(reviews.aggregate(Avg('rating'))['rating__avg'] or 0, 1)

        return Response({
            "total_reviews": total_reviews,
            "average_rating": avg_rating
        }, status=status.HTTP_200_OK)
    

class FilteredProviderList(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        role = request.GET.get('role')
        address = request.GET.get('address')
        rating = request.GET.get('rating')
        min_reviews = request.GET.get('min_reviews')

        providers = ProviderProfile.objects.all()

        # Filters
        if role:
            providers = providers.filter(role__icontains=role)
        if address:
            providers = providers.filter(address__icontains=address)
        
        # Reviews filtering using annotations
        providers = providers.annotate(
            avg_rating=Avg('reviewrating__rating'),
            review_count=Count('reviewrating')
        )

        if rating:
            providers = providers.filter(avg_rating__gte=float(rating))
        if min_reviews:
            providers = providers.filter(review_count__gte=int(min_reviews))

        result = []
        for p in providers:
            result.append({
                "username": p.user.username,
                "role": p.role,
                "address": p.address,
                "phone": p.phone,
                "status": p.status,
                "profile_picture": request.build_absolute_uri(p.profile_picture.url) if p.profile_picture else None,
                "average_rating": round(p.avg_rating or 0, 1),
                "review_count": p.review_count
            })

        return Response(result)


from .models import Booking # your Booking model and user model
from rest_framework import status
from .serializers import BookingSerializer

@api_view(['POST'])
def book_provider(request):
    seeker_username = request.data.get("seeker")
    provider_username = request.data.get("provider")

    try:
        seeker = User.objects.get(username=seeker_username)
        provider = User.objects.get(username=provider_username)

        # Save booking
        Booking.objects.create(seeker=seeker, provider=provider)

        return Response({"message": "Booked successfully"}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['GET'])
def get_bookings(request):
    seeker_username = request.GET.get("seeker")
    provider_username = request.GET.get("provider")

    if seeker_username:
        bookings = Booking.objects.filter(seeker__username=seeker_username)
    elif provider_username:
        bookings = Booking.objects.filter(provider__username=provider_username)
    else:
        bookings = Booking.objects.none()

    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def cancel_booking(request, booking_id):
    try:
        booking = Booking.objects.get(id=booking_id)
        booking.delete()
        return Response({"message": "Booking cancelled"})
    except Booking.DoesNotExist:
        return Response({"error": "Booking not found"}, status=404)



#********************Start Smart-Search*****************

# Service Mapping
services_mapping={
  "electrician": ["fan","light",
    "switch",
    "socket",
    "inverter",
    "stabilizer",
    "wiring",
    "exhaust fan",
    "doorbell",
    "circuit",
    "fuse",
    "generator",
    "mcb",
    "ups",
    "ac",
    "electrician"
  ],
  "plumber": [
    "tap",
    "pipe",
    "pani",
    "water"
    "flush",
    "geyser",
    "toilet",
    "bathroom",
    "sink",
    "shower",
    "sanitary",
    "washbasin",
    "water tank",
    "water pump",
    "water",
    "sewage",
    "plumber"
  ],
  "carpenter": [
    "sofa",
    "bed",
    "table",
    "chair",
    "wood",
    "almirah",
    "door",
    "window",
    "furniture",
    "wardrobe",
    "cabinet",
    "bookshelf",
    "drawer",
    "carpenter",
    "partition"
  ],
  "ac service": [
    "ac",
    "air conditioner",
    "cooler",
    "hvac",
    "compressor",
    "condenser"
  ],
  "painter": [
    "wall",
    "plaster",
    "color",
    "paint",
    "ceiling",
    "fence",
    "gate"
  ],
  "appliance repair": [
    "microwave",
    "washing machine",
    "refrigerator",
    "tv",
    "chimney",
    "grinder",
    "gas stove",
    "oven",
    "dishwasher",
    "mixer",
    "induction",
    "air fryer",
    "toaster",
    "coffee machine",
    "dryer",
    "freezer"
  ],
  "cleaning services": [
    "house",
    "sofa",
    "carpet",
    "kitchen",
    "bathroom",
    "car",
    "water tank",
    "solar panel",
    "window",
    "floor",
    "chimney",
    "mattress",
    "office",
    "garage",
    "balcony"
  ],
  "pest control": [
    "pest",
    "termite",
    "cockroach",
    "mosquito",
    "bedbug",
    "rodent",
    "ant",
    "lizard",
    "spider"
  ],
  "security services": [
    "cctv",
    "camera",
    "security guard",
    "surveillance",
    "alarm system",
    "video door phone",
    "access control"
  ],
  "moving & shifting": [
    "house",
    "goods",
    "furniture",
    "office",
    "vehicle",
    "luggage",
    "appliances",
    "packing material"
  ],
  "vehicle service": [
    "car",
    "bike",
    "scooter",
    "truck",
    "van",
    "jeep",
    "bicycle",
    "battery",
    "tyre",
    "engine"
  ],
  "internet setup": [
    "wifi",
    "internet",
    "router",
    "modem",
    "broadband",
    "network cable"
  ],
  "kitchen services": [
    "chimney",
    "gas stove",
    "kitchen",
    "hob",
    "sink",
    "modular kitchen",
    "gas pipeline"
  ],
  "civil & construction work": [
    "glass",
    "wall",
    "pipe",
    "motor",
    "false ceiling",
    "civil",
    "sanitary",
    "flooring",
    "tiles",
    "marble",
    "granite",
    "brick",
    "concrete",
    "roof",
    "plaster",
    "boundary wall"
  ],
  "gardening": [
    "garden",
    "plants",
    "lawn",
    "tree",
    "shrubs",
    "grass",
    "flower bed",
    "hedge",
    "sprinkler"
  ],
  "mobile/laptop repair": [
    "mobile",
    "laptop",
    "tablet",
    "smartphone",
    "desktop",
    "printer",
    "scanner"
  ],
  "ro/water purifier service": [
    "ro",
    "water purifier",
    "uv purifier",
    "uf purifier",
    "alkaline purifier",
    "water dispenser"
  ],
  "salon & beauty": [
    "haircut",
    "facial",
    "makeup",
    "manicure",
    "pedicure",
    "bridal makeup",
    "hair spa"
  ],
  "fitness & wellness": [
    "yoga",
    "fitness",
    "gym",
    "trainer",
    "zumba",
    "meditation",
    "aerobics",
    "dietician"
  ],
  "education services": [
    "home tutor",
    "math tutor",
    "english tutor",
    "science tutor",
    "computer classes",
    "coaching",
    "tuition"
  ],
  "event services": [
    "wedding",
    "birthday party",
    "catering",
    "decoration",
    "event planner",
    "photography",
    "dj",
    "sound system"
  ],
  "laundry services": [
    "laundry",
    "dry cleaning",
    "ironing",
    "clothes washing",
    "curtain cleaning"
  ],
  "driving services": [
    "driver",
    "driving instructor",
    "car driver",
    "bike driver"
  ],
  "elder care": [
    "elder care",
    "nurse",
    "caretaker",
    "attendant",
    "medical care"
  ],
  "child care": [
    "babysitter",
    "nanny",
    "daycare",
    "child tutor"
  ],
  "food services": [
    "personal chef",
    "home chef",
    "catering",
    "tiffin service",
    "meal delivery"
  ],
  "others": [
    "minor repair",
    "general service",
    "consultation",
    "installation",
    "maintenance",
    "inspection"
  ]


}

# pip install langdetect
logger = logging.getLogger(__name__)

#for open aiapi  keys
from openai import OpenAI

client = OpenAI(
    api_key="api_key"
)

#for gemini pro api ai keys
# pip install google-generativeai deep-translator langdetect
# import google.generativeai as genai
import google.generativeai as genai
genai.configure(api_key="API_key")
gemini_model=genai.GenerativeModel('gemni model')


# --- Helper Functions ---

def is_hinglish(text):
    text = text.strip()
    devanagari_chars = re.compile("[\u0900-\u097F]+")
    if devanagari_chars.search(text):
        return False
    try:
        lang = detect(text)
        return lang == 'en'
    except Exception:
        return False


def hinglish_spacy_hindi(text):
    return GoogleTranslator(source='auto', target='hi').translate(text)

def translate_spacy_english(text):
    try:
        if is_hinglish(text):
            logger.info("Detected Hinglish. Converting to Hindi...")
            text = hinglish_spacy_hindi(text)
        translated_text = GoogleTranslator(source='auto', target='en').translate(text)
        return translated_text
    except Exception as e:
        logger.error(f"Translation failed: {str(e)}")
    return text

def load_custom_ner_model():
    model_path = os.path.join("backend", "custom_service_ner")
    if os.path.exists(model_path):
        return spacy.load(model_path)
    else:
        print("❌ Model not found. Please train it first.")
        return None
def extract_spacy_service(text):
    nlp = load_custom_ner_model()
    if nlp is None:
        return {"error": "Model not loaded. Train the model first."}

    doc = nlp(text)
    entities = [{"text": ent.text, "label": ent.label_} for ent in doc.ents]
    print({"entities": entities})
    if entities:
        return entities[0]["text"]
    else:
        return None
# # class c
class SmartMultiLanguageSearchView(APIView):
    def post(self, request):
        query = request.data.get('query', '').strip()
        aiquery=query;
        gemniquery=query;
        spacyquery=query;
        mappingquery=query;

        # Step 1: check if query exist
        if not query:
            return Response({'error': 'No query provided.'}, status=status.HTTP_400_BAD_REQUEST)
        # try:
        #     translated = smart_translate_to_english(aiquery)
        #     logger.info(f"Translated Query: {translated}")
        # except Exception as e:
        #     logger.warning(f"Translation failed, using original query. Error: {str(e)}")
        #     translated = aiquery
        providers = ProviderProfile.objects.none()
        

        # --- Step 1: Try OpenAI First ---
        
        try:
                
                prompt = (
                    # f""" 
                    # Given a user query , predict the ONE most relevant service category from this text like: 
                    # Plumber, Electrician, Carpenter, Painter, AC Repair, Mobile Repair, Water Tank Cleaning, Car Mechanic, Gardener, etc. 
                    # {', '.join(services_mapping.keys())}

                    # Rules:
                    # - Output only one category from the text.
                    # - No explanation, just return the exact category name.
                    
                    # Query: "{translated}"
                    # """

                    f"""
                    INSTRUCTIONS:
                    1. Analyze this query in ANY LANGUAGE: "{aiquery}"
                    2. Convert it to English while preserving meaning
                    3. Identify the SINGLE most relevant service category from:
                    [plumber, electrician, carpenter, painter, ac repair, mobile repair, 
                    water tank cleaning, car mechanic, gardener, cleaning, pest control].
                    {', '.join(services_mapping.keys())}
                    
                    RULES:
                    - Output ONLY the category name in lowercase
                    - If unclear, return "unknown"
                    - No explanations or additional text
                    - Ignore greetings/politeness words
                    
                    EXAMPLES:
                    Input: "mujhe nal thik krana hai" (hinglish) → "plumber"
                    Input: "मुझे अपनी कार की मरम्मत करवानी है" (hindi) → "mechenic"
                    Input: "i need electrician" (english) → "electrician"
                    Input: "我的水管漏水了" (Chinese) → "plumber"
                    Input: "Il mio rubinetto perde" (Italian) → "plumber" 
                    Input: "Mi ventilador no funciona" (Spanish) → "electrician"
                    Input: "أحتاج سباك" (Arabic) → "plumber"
                    Input: "General inquiry" → "unknown"
                    
                    Your output for "{aiquery}":
                    """
                )
                response = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=150,
                    timeout=10
                )
                openai_result = response.choices[0].message.content.strip().lower()
                logger.info(f"OpenAI Output: {openai_result}")

                if openai_result.lower() != "unknown":
                    keyword = openai_result.lower()
                    providers = ProviderProfile.objects.filter(
                        
                            Q(user__username__iexact=keyword) |
                            Q(role__iexact=keyword) |
                            Q(address__iexact=keyword) |
                            Q(phone__iexact=keyword)

                        ).distinct()
        except Exception as e:
            logger.error(f"OpenAI keyword extraction failed: {str(e)}")
        
        #  --- Step 1.1: Try gemini pro First.first ---    
        if not providers.exists():
            try:
                # prompt = f"""
                # Given a user query, predict the ONE most relevant service category from this list:
                # Plumber, Electrician, Carpenter, Painter, AC Repair, Mobile Repair, Water Tank Cleaning, Car Mechanic, Gardener.

                # Rules:
                # - Output only ONE category.
                # - No explanation, just return the exact name.
                
                # Query: "{translated}"
                # """
                prompt = f"""
                    INSTRUCTIONS:
                    1. Analyze this query in ANY LANGUAGE: "{gemniquery}"
                    2. Convert it to English while preserving meaning
                    3. Identify the SINGLE most relevant service category from:
                    [plumber, electrician, carpenter, painter, ac repair, mobile repair, 
                        water tank cleaning, car mechanic, gardener, cleaning, pest control]
                    
                    RULES:
                    - Output ONLY the category name in lowercase
                    - If unclear, return "unknown"
                    - No explanations or additional text
                    - Ignore greetings/politeness words
                    
                    EXAMPLES:
                    Input: "mujhe nal thik krana hai" (hinglish) → "plumber"
                    Input: "मुझे अपनी कार की मरम्मत करवानी है" (hindi) → "mechenic"
                    Input: "i need electrician" (english) → "electrician"
                    Input: "我的水管漏水了" (Chinese) → "plumber"
                    Input: "Il mio rubinetto perde" (Italian) → "plumber" 
                    Input: "Mi ventilador no funciona" (Spanish) → "electrician"
                    Input: "أحتاج سباك" (Arabic) → "plumber"
                    Input: "General inquiry" → "unknown"
                    
                    Your output for "{gemniquery}":
                    """

                gemini_response = gemini_model.generate_content(prompt)
                category = gemini_response.text.strip().lower()
                logger.info(f"Gemini Output: {category}")

                if category in services_mapping:
                    keyword = services_mapping[category]
                    providers = ProviderProfile.objects.filter(
                        Q(role__icontains=keyword) |
                        Q(user__username__icontains=keyword) |
                        Q(address__icontains=keyword)
                    ).distinct()
            except Exception as e:
                logger.error(f"Gemini keyword extraction failed: {str(e)}")


        # --- Step 2: If OpenAI failed (no providers found), try spaCy NER ---
        if not providers.exists():
            try:
                translated_spacy = translate_spacy_english(spacyquery)
                detected_services = extract_spacy_service(translated_spacy)
                logger.info(f"spaCy NER detected services: {detected_services}")
                if detected_services:
                    for service in detected_services:
                        providers |= ProviderProfile.objects.filter(
                            # # #similar things match
                            
                            # #exact match
                            Q(user__username__iexact=service) |
                            Q(role__iexact=service) |
                            Q(address__iexact=service) |
                            Q(phone__iexact=service)

                        )
                    providers = providers.distinct()
            except Exception as e:
                logger.error(f"spaCy fallback search failed: {str(e)}")
        
        # --- Step 3: If spaCy also failed, fallback to Manual Mapping ---
        if not providers.exists():
            try:
                translated_spacy = translate_spacy_english(mappingquery)
                words = translated_spacy.lower().split()

                matched_services = set()  # always define it

                for word in words:
                    for mapp_services, keywords in services_mapping.items():
                            if word in keywords:
                                matched_services.add(mapp_services)

                if matched_services:
                    logger.info(f"Trying manual keyword mapping fallback... {matched_services}")
                    providers = ProviderProfile.objects.none()
                    for service in matched_services:
                            providers |= ProviderProfile.objects.filter(
                                Q(user__username__icontains=service) |
                                Q(role__icontains=service) |
                                Q(address__icontains=service) |
                                Q(phone__icontains=service)
                            )
                    providers = providers.distinct()

            except Exception as e:
                    logger.error(f"manual mapping fallback search failed: {str(e)}")

        if providers.exists():
                    serializer = ProviderProfileSerializer(providers, many=True)
                    return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "No matching found. Please refine your query."}, status=status.HTTP_404_NOT_FOUND)

# # #******************End Smart Search*****************************
