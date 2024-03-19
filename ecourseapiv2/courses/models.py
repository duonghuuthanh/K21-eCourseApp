from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField


class User(AbstractUser):
    pass


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']


class Tag(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Course(BaseModel):
    name = models.CharField(max_length=255)
    description = RichTextField(null=True)
    image = CloudinaryField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Lesson(BaseModel):
    subject = models.CharField(max_length=255)
    content = RichTextField(null=True)
    image = CloudinaryField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.subject


class Interaction(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Comment(Interaction):
    content = models.CharField(max_length=255)


class Like(Interaction):
    class Meta:
        unique_together = ('user', 'lesson')