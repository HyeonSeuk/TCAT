from django.shortcuts import render, redirect
import requests
from bs4 import BeautifulSoup
from .models import Tcat, TcatImage
from .forms import TcatForm, TcatImageForm

# Create your views here.
def index_redirect(request):
    return redirect('tcat:index')

def index(request):
    return render(request, 'tcat/index.html')


def detail(request, tcat_pk):
    tcat = Tcat.objects.get(pk=tcat_pk)
    context = {
        'tcat': tcat,
    }
    return render(request, 'tcat/detail.html', context)


def create(request):
    if request.method == 'POST':
        form = TcatForm(request.POST, request.FILES)
        imageForm = TcatImageForm(request.POST, request.FILES)
        if form.is_valid() and imageForm.is_valid():
            tcat = form.save(commit=False)
            tcat.user = request.user
            tcat.save()

            for image in request.FILES.getlist('image'): # s 없나
                TcatImage.objects.create(post=tcat, image=image)
            return redirect('tcat:detail', tcat.pk)
    else:
        form = TcatForm()
        imageForm = TcatImageForm()
    context = {
        'form': form,
        'imageForm': imageForm,
    }
  
    return render(request, 'tcat/create.html', context)