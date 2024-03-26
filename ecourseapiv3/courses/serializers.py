from rest_framework import serializers
from courses.models import Category, Course, Lesson, Tag, User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        req = super().to_representation(instance)
        req['image'] = instance.image.url
        return req


class CourseSerializer(ItemSerializer):

    class Meta:
        model = Course
        fields = ['id', 'name', 'image', 'created_date']


class TagSerialzier(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class LessonSerializer(ItemSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'subject', 'image', 'created_date']


class LessonDetailsSerializer(LessonSerializer):
    tags = TagSerialzier(many=True)

    class Meta:
        model = LessonSerializer.Meta.model
        fields = LessonSerializer.Meta.fields + ['content', 'tags']


class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(user.password)
        user.save()

        return user

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password', 'avatar']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }
