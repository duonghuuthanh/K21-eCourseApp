from django.contrib import admin
from django.db.models import Count
from django.template.response import TemplateResponse

from courses.models import Category, Course, Lesson, Tag, Comment
from django.utils.html import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.urls import path
from courses.models import Category


class MyAdminSite(admin.AdminSite):
    site_header = 'iCourse'

    def get_urls(self):
        return [path('cate-stats/', self.stats)] + super().get_urls()

    def stats(self, request):
        stats = Category.objects.annotate(counter=Count('course__id')).values('id', 'name', 'counter')
        return TemplateResponse(request, 'admin/stats.html', {
            'stats': stats
        })


admin_site = MyAdminSite(name='iCourseApp')


class CourseForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Course
        fields = '__all__'


class CourseAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created_date', 'updated_date', 'active']
    search_fields = ['name', 'description']
    list_filter = ['id', 'name', 'created_date']
    readonly_fields = ['my_image']
    form = CourseForm

    def my_image(self, course):
        if course.image:
            return mark_safe(f"<img width='200' src='{course.image.url}' />")

    class Media:
        css = {
            'all': ['/static/css/style.css']
        }


admin_site.register(Category)
admin_site.register(Course, CourseAdmin)
admin_site.register(Lesson)
admin_site.register(Tag)
admin_site.register(Comment)
