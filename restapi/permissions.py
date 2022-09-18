from rest_framework import permissions
from restapi.models import ProjectUser

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if hasattr(obj, 'owner'):
            return obj.owner == request.user
        if hasattr(obj, 'password'):
            return obj == request.user
        return False

class IsProjectUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
           
        users = ProjectUser.objects.filter(project=obj.id).values('user')   
        users = [user['user'] for user in users]

        return obj.owner == request.user or request.user.id in users