from urllib import request
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from restapi.models import Comment, Project, ProjectUser, User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings


class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    users_list = serializers.ListField()

    class Meta:
        model = Project
        fields = ('id', 'owner', 'name', 'start_date',
                  'end_date', 'description', 'state', 'users_list')

    def create(self, valid_data):
        project = Project(
            owner=valid_data['owner'],
            name=valid_data['name'],
            start_date=valid_data['start_date'],
            end_date=valid_data['end_date'],
            description=valid_data['description'],
            state='NEW'
        )
        project.save()
        for user in valid_data['users_list']:
            u = User.objects.get(pk=user.get('value'))
            project_user = ProjectUser(
                user=u,
                project=project
            )
            project_user.save()
        return project

    def update(self, instance,  valid_data):
        print('UPDATE PROJECT', valid_data)
        print('UPDATE PROJECT', instance)

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Comment
        fields = ('url', 'id', 'owner', 'created', 'content', 'project')


class UserSerializer(serializers.ModelSerializer):
    age = serializers.ReadOnlyField()
    id = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'lastname' , 'sex', 'phone', 'dob', 'age']


class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class RegisterSerializer(UserSerializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)
    email = serializers.EmailField(required=True, write_only=True, max_length=128)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'lastname' , 'sex', 'password', 'phone', 'dob']

    def create(self, validated_data):
        try:
            user = User.objects.get(email=validated_data['email'])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
        return user


class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)
