from django.urls import path
from . import views

app_name = 'accounts'
urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('signup/', views.signup, name='signup'),
    path('profile/<username>/', views.profile, name='profile'),
    path('profile/delete/', views.delete, name='delete'),
    path('<int:user_pk>/follow/', views.follow, name='follow'),
    path('<int:user_pk>/follower/', views.follower, name='follower'),
]