
from django.urls import path, re_path, include
from rest_framework import routers
from courses import views

r = routers.DefaultRouter()
r.register('categories', views.CategoryViewset, basename='categories')
r.register('courses', views.CourseViewSet, basename='courses')

urlpatterns = [
    path('', include(r.urls)),
]
