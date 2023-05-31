from django.urls import path
from . import views
from .views import kakao_image_search
from .views import naver_image_search

app_name = 'tcat'

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:tcat_pk>/', views.detail, name='detail'),
    path('create/', views.create, name='create'),
    path('all_events/', views.all_events, name='all_events'),
    path('capture/', views.capture, name='capture'),
    path('kakao_image_search/', kakao_image_search, name='kakao_image_search'),
    path('naver_image_search/', naver_image_search, name='naver_image_search'),
]