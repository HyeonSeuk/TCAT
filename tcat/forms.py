from django import forms
from .models import Tcat, TcatImage
from ckeditor.widgets import CKEditorWidget


class TcatForm(forms.ModelForm):
    class Meta:
        model = Tcat
        fields = (
            'title',
            'date',
            'location',
            'price',
            'categori',
            'review',
        )

        widget = {
            'review': forms.CharField(widget=CKEditorWidget()),
        }

    categori = forms.ChoiceField(choices=[
        ('','카테고리를 선택해주세요'),
        ('뮤지컬','뮤지컬'),
        ('영화','영화'),
        ('콘서트','콘서트'),
        ('전시회','전시회'),
        ('스포츠','스포츠'),
        ('연극','연극'),
        ('테마파크','테마파크'),
        ('항공권','항공권'),
        ('입장권','입장권'),
        ('기타','기타'),
    ])

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['title'].widget.attrs['class'] = 'contents__title--input'
        self.fields['location'].widget.attrs['class'] = 'contents__title--input'
        self.fields['price'].widget.attrs['class'] = 'contents__title--input'
        self.fields['categori'].widget.attrs['class'] = 'contents__title--input'
        self.fields['review'].widget.attrs['class'] = 'contents__title--input'


    def save(self, commit=True):
        instance = super().save(commit)
        if self.cleaned_data.get('images'):
            for image in self.cleaned_data.get('images'):
                TcatImage.objects.create(tcat=instance, image=image)
        return instance


class TcatImageForm(forms.ModelForm):
    class Meta:
        model = TcatImage
        fields = ('image',)
        widgets = {'image': forms.FileInput(attrs={'multiple': True})}
