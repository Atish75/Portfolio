# urls.py
from django.urls import path
from .views import home, send_email_view

urlpatterns = [
    path('', home, name='home'),
    path('send-email/', send_email_view, name='send_email'),
]