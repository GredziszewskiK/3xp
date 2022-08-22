from datetime import date

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from phonenumber_field.modelfields import PhoneNumberField

STATE_CHOICES = (('NEW', 'New'), ('OPEN', 'Open'), ('CLOSE', 'Close'))
USER_TYPE_CHOICES = (('OWNER', 'Owner'), ('WORKER', 'Worker'))
SEX_CHOICES = (('MALE', 'Male'), ('FAMALE', 'Famale'))

class UserManager(BaseUserManager):

    def create_user(
        self, 
        email,
        name,
        lastname,
        sex,
        password=None, 
        phone=None,
        dob=None,
        **kwargs
    ):
        if name is None:
            raise TypeError('Users must have a username.')
        if email is None:
            raise TypeError('Users must have an email.')

        user = self.model(
                email=self.normalize_email(email),
                name=name,  
                lastname=lastname,
                phone=phone,
                sex=sex,
                dob=dob
            )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(
        self, 
        email,
        name,
        lastname,
        sex,
        password, 
        phone,
        dob,
    ):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')
        if name is None:
            raise TypeError('Superusers must have an username.')

        user = self.create_user(email, name, lastname, sex, password, phone, dob)
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(db_index=True, unique=True,  null=True, blank=True)
    name = models.CharField(db_index=True, max_length=50, unique=True)
    lastname = models.CharField(db_index=True, max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    phone = PhoneNumberField(null = True, blank = True)
    dob = models.DateField()
    sex = models.CharField(choices=SEX_CHOICES, default='FAMALE', max_length=6)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'lastname', 'dob', 'sex']

    objects = UserManager()

    def __str__(self):
        return f'{self.email}'

    @property
    def age(self):
        today = date.today()

        try: 
            birthday = self.dob.replace(year=today.year)
        except ValueError:
            birthday = self.dob.replace(year=today.year, day=self.dob.day-1)

        if birthday > today:
            return today.year - self.dob.year - 1
        else:
            return today.year - self.dob.year


class Project(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    state = models.CharField(choices=STATE_CHOICES, default='NEW', max_length=50)
    name = models.CharField(max_length=100)
    description = models.TextField()
    owner = models.ForeignKey(User, related_name='projects', on_delete=models.CASCADE)

    class Meta:
        ordering = ['created']

    def __str__(self) -> str:
        return f'{self.name}'

    @property
    def users_list(self):
        users = ProjectUser.objects.all().filter(project=self.id).select_related()
        users_list = []
        for user in users:
            users_list.append({'value': user.user.id, 'name': ' '.join([user.user.name, user.user.lastname])})
        return users_list


class Comment(models.Model):
    project = models.ForeignKey(Project, related_name='comments', on_delete=models.CASCADE)
    owner = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    content = models.TextField()

    class Meta:
        ordering = ['created']


class ProjectUser(models.Model):
    user = models.ForeignKey(User, related_name='projectuser', on_delete=models.CASCADE)
    project = models.ForeignKey(Project, related_name='users', on_delete=models.CASCADE)
    user_type = models.CharField(choices=USER_TYPE_CHOICES, default='WORKER', max_length=50)
    
    def __str__(self) -> str:
        return f'{self.user, self.project}'


