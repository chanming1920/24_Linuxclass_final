from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.file_upload_view, name='file_upload'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # 파일처리
