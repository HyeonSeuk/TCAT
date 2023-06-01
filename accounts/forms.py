from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


class CustomUserCreationForm(UserCreationForm):
    image = forms.ImageField(label='프로필 사진', label_suffix='', 
        widget=forms.ClearableFileInput (
        attrs={'class': 'form-control mb-2', 'style': 'width: 360px;',}))

    username = forms.CharField(label='아이디', label_suffix='', widget=forms.TextInput(
        attrs={'class': 'form-control', 'style': 'width: 360px;','placeholder': '아이디 (2~15자)','id':'user_id',}))
    
    email = forms.EmailField(label='이메일', label_suffix='', widget=forms.EmailInput(
        attrs={'class': 'form-control', 'style': 'width: 360px;', 'placeholder': '이메일 입력',}))
    
    password1 = forms.CharField(label='비밀번호', label_suffix='', widget=forms.PasswordInput(
        attrs={'class': 'form-control placeholder-font','style': 'width: 360px;', 'placeholder': '비밀번호 입력',}))
    
    password2 = forms.CharField(label='비밀번호 확인', label_suffix='', widget=forms.PasswordInput(
        attrs={'class': 'form-control placeholder-font', 'style': 'width: 360px;','placeholder': '비밀번호 확인',}))

    class Meta(UserCreationForm.Meta):
        model = get_user_model()
        fields = (
            'image',
            'username',
            'email',
            'password1',
            'password2',
        )


class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(
        label='', label_suffix='',
        widget=forms.TextInput(
            attrs={
                'autofocus': True, 
                'class': 'form-control',
                'style': 'width: 360px; height: 40px;',
                'placeholder': '아이디',
                }))

    password = forms.CharField(
        label='', label_suffix='',
        strip=False, 
        widget=forms.PasswordInput(
            attrs={
                'autocomplete': 'current-password', 
                'class': 'form-control',
                'style': 'width: 360px; height: 40px;',
                'placeholder': '비밀번호',
                }))
    