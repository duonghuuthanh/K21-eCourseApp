from django.contrib import admin
from django.db.models import Count
from django.template.response import TemplateResponse
from django.utils.html import mark_safe

from courses.models import Course, Category,Lesson, Comment, Tag, Like

from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.urls import path


class MyAdminSite(admin.AdminSite):
    site_header = 'iCourse'

    def get_urls(self):
        return [path('cate-stats/', self.stats_view)] + super().get_urls()

    def stats_view(self, request):
        stats = Category.objects.annotate(counter=Count('course__id')).values('id', 'name', 'counter')
        return TemplateResponse(request, 'admin/stats.html', {
            'stats': stats
        })


admin_site = MyAdminSite(name='iCourse')


class CourseForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Course
        fields = '__all__'


class MyCourseAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created_date', 'updated_date', 'active']
    search_fields = ['id', 'name']
    list_filter = ['created_date', 'name']
    readonly_fields = ['my_image']
    form = CourseForm

    def my_image(self, course):
        if course.image:
            return mark_safe(f"<img src='/static/{course.image.name}' width='200' />")


admin_site.register(Category)
admin_site.register(Course, MyCourseAdmin)
admin_site.register(Lesson)
admin_site.register(Comment)
admin_site.register(Tag)
admin_site.register(Like)
