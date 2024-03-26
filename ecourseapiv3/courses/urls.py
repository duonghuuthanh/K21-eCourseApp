from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import routers
from courses import views

r = routers.DefaultRouter()
r.register('categories', views.CategoryViewSet, 'categories')
r.register('courses', views.CourseViewSet, 'courses')
r.register('lessons', views.LessonViewSet, 'lessons')
r.register('users', views.UserViewSet, 'users')

urlpatterns = [
    path('', include(r.urls))
]
