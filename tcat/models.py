from django.db import models
from django.conf import settings
from ckeditor.fields import RichTextField


# Create your models here.
class Tcat(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateField()
    location = models.CharField(max_length=50)
    price = models.IntegerField()
    # review = models.CharField(max_length=50)
    review = RichTextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    categori = models.CharField(max_length=50)


class TcatImage(models.Model):
    tcat = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    image = models.ImageField(blank=True, null=True, upload_to='ticket_diarys/')
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    




# from imagekit.models import ProcessedImageField
# from imagekit.processors import ResizeToFill
# class PostImage(models.Model):
#     def default_image():
#         return "default_image_path.jpg"
#     post = models.ForeignKey(to=Post, on_delete=models.CASCADE, related_name='post_images')
#     image = ProcessedImageField(
#         upload_to='posts/images',
#         processors=[ResizeToFill(800, 800)],
#         format='JPEG',
#         options={'quality': 90},
#         default=default_image,
#     )