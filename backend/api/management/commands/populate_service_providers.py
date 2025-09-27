from django.core.management.base import BaseCommand
from api.models import ServiceProvider  # Import from api.models since you're using the existing app

class Command(BaseCommand):
    help = "Populate the database with sample service providers"

    def handle(self, *args, **kwargs):
        data = [
            {"name": "John Doe", "service_field": "Plumber", "location": "New Delhi"},
            {"name": "Jane Smith", "service_field": "Electrician", "location": "Mumbai"},
            {"name": "Mike Johnson", "service_field": "Plumber", "location": "Kolkata"},
        ]

        for item in data:
            provider, created = ServiceProvider.objects.get_or_create(**item)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Added: {provider.name}"))
            else:
                self.stdout.write(self.style.WARNING(f"Skipped (already exists): {provider.name}"))

        self.stdout.write(self.style.SUCCESS("Database populated successfully!"))