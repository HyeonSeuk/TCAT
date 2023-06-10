from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomUserCreationForm, CustomAuthenticationForm, CustomUserChangeForm, CustomPasswordChangeForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth import update_session_auth_hash, get_user_model


def login(request):
    if request.user.is_authenticated:
        return redirect('tcat:index')

    if request.method == 'POST':
        form = CustomAuthenticationForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            # auth_login(request, form.get_user())
            if user is not None:
                auth_login(request, form.get_user())
                return redirect('tcat:index')
            else:
                form.add_error(None, '아이디 또는 비밀번호가 올바르지 않습니다.')              
    else:
        form = CustomAuthenticationForm()

    context = {
        'form': form,
    }
    return render(request, 'accounts/login.html', context)


@login_required
def logout(request):
    if request.user.is_authenticated:
        auth_logout(request)
    return redirect('tcat:index')


def signup(request):
    if request.user.is_authenticated:
        return redirect('tcat:index')

    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            user = authenticate(
                username=user.username,
                password=form.cleaned_data['password1']
            )
            if user is not None:
                auth_login(request, user)
                return redirect('tcat:index')
    else:
        form = CustomUserCreationForm()

    context = {
        'form': form,
    }
    return render(request, 'accounts/signup.html', context)


@login_required
def profile(request, username):
    User = get_user_model()
    person = User.objects.get(username=username)
    context = {
        'person': person,
    }
    return render(request, 'accounts/profile.html', context)


@login_required
def delete(request):
    request.user.delete()
    auth_logout(request)
    return redirect('tcat:index')


@login_required
def follow(request, user_pk):
    User = get_user_model()
    you = User.objects.get(pk=user_pk)
    me = request.user

    if you != me:
        if me in you.followers.all():
            you.followers.remove(me)
            is_followed = False
        else:
            you.followers.add(me)
            is_followed = True
        context = {
            'is_followed': is_followed,
            'followings_count': you.followings.count(),
            'followers_count': you.followers.count(),
            'followings': [{'username': f.username, 'pk': f.pk} for f in you.followings.all()],
            'followers': [{'username': f.username,'pk': f.pk} for f in you.followers.all()]
        }
        
        return JsonResponse(context)
    return redirect('accounts:profile', you.username)

def follower(request, user_pk):
    User = get_user_model()
    user = User.objects.get(pk=user_pk)
    followers = [{'username': f.username, 'pk': f.pk} for f in user.followers.all()]
    return JsonResponse({'followers': followers})


def check_follow_status(request, user_id):
    User = get_user_model()
    target_user = User.objects.get(id=user_id)
    is_following = (request.user in target_user.followers.all()) and (target_user in request.user.followers.all())
    
    return JsonResponse({"is_following": is_following})


@login_required
def update(request):
    if request.method == "POST":
        form = CustomUserChangeForm(
            request.POST, instance=request.user, files=request.FILES
        )
        if form.is_valid():
            form.save()
            return redirect("accounts:profile", request.user.username)
    else:
        form = CustomUserChangeForm(instance=request.user)
    context = {
        "form": form,
    }
    return render(request, "accounts/update.html", context)


@login_required
def change_password(request):
    if request.method == "POST":
        form = CustomPasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            return redirect("accounts:profile", request.user.username)
    else:
        form = CustomPasswordChangeForm(request.user)
    context = {
        "form": form,
    }
    return render(request, "accounts/change_password.html", context)