from rest_framework.permissions import BasePermission

class IsSpecificAdmin(BasePermission):
    """
    Allow access only to a specific user (you).
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.username == 'vijay_kumar_singh'  # Change this as needed
