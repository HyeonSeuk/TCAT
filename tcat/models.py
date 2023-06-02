from django.db import models
from django.conf import settings
from ckeditor.fields import RichTextField


# Create your models here.
class Tcat(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateField()
    location = models.CharField(max_length=50, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True, upload_to='ticket_diarys/')
    image_url = models.URLField(blank=True)
    review = RichTextField(blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    categori = models.CharField(max_length=50, blank=True, null=True)


class DynamicField(models.Model):
    tcat = models.ForeignKey(Tcat, on_delete=models.CASCADE, related_name='dynamic_field')
    field_title = models.CharField(max_length=255, null=True)
    field_value = models.CharField(max_length=255, null=True)

# class TcatImage(models.Model):
#     tcat = models.ForeignKey(Tcat, on_delete=models.CASCADE, related_name='images')
#     image = models.ImageField(blank=True, null=True, upload_to='ticket_diarys/')
#     create_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)




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