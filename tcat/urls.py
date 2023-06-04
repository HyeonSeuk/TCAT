from django.urls import path
from . import views
from .views import kakao_image_search
from .views import naver_image_search

app_name = 'tcat'

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:tcat_pk>/', views.detail, name='detail'),
    path('create/', views.create, name='create'),
    path('<int:tcat_pk>/delete/', views.delete, name='delete'),
    path('<int:tcat_pk>/update/', views.update, name='update'),
    path('all_events/', views.all_events, name='all_events'),
    path('update_event/', views.update_event, name='update_event'),
    path('capture/', views.capture, name='capture'),
    path('kakao_image_search/', kakao_image_search, name='kakao_image_search'),
    path('naver_image_search/', naver_image_search, name='naver_image_search'),
    path('search/', views.search, name='search'),
    path('get_monthly_expenses/', views.get_monthly_expenses, name='get_monthly_expenses'),
    path('get_monthly_post_counts/', views.get_monthly_post_counts, name='get_monthly_post_counts'),
]