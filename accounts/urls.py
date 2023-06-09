from django.urls import path
from . import views

app_name = 'accounts'
urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('signup/', views.signup, name='signup'),
    path('profile/<username>/', views.profile, name='profile'),
    path('delete/', views.delete, name='delete'),
    path('<int:user_pk>/follow/', views.follow, name='follow'),
    path('<int:user_pk>/follower/', views.follower, name='follower'),
    path('<int:user_id>/check_follow_status/', views.check_follow_status, name='check_follow_status'),
    path('update/', views.update, name='update'),
    path('password/', views.change_password, name='change_password'),
]