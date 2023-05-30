from django.urls import path
from . import views

app_name = 'tcat'

urlpatterns = [
    path('', views.index, name='index'),
    path('detail/', views.detail, name='detail'),
    path('create/', views.create, name='create'),
    path('all_events/', views.all_events, name='all_events'),
]