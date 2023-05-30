from django import forms
from .models import Tcat


class TcatForm(forms.ModelForm):
    class Meta:
        model = Tcat
        fields = ('title', 'date', 'location', 'price', 'review', 'image')


