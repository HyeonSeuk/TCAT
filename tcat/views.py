from django.shortcuts import render, redirect
import requests
from bs4 import BeautifulSoup

# Create your views here.
def index_redirect(request):
    return redirect('tcat:index')

def index(request):
    return render(request, 'tcat/index.html')


def detail(request):
    return render(request, 'tcat/detail.html')


def create(request):
    return render(request, 'tcat/create.html')