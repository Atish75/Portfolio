import json
from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings

def home(request):
    return render(request, 'portfolio.html')

def send_email_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name', '').strip()
            email = data.get('email', '').strip()
            subject = data.get('subject', '').strip()
            message = data.get('message', '').strip()

            if not all([name, email, subject, message]):
                return JsonResponse({'message': 'Please fill all fields.'}, status=400)

            full_subject = f"Portfolio Message: {subject}"
            body = f"Name: {name}\nEmail: {email}\nSubject: {subject}\n\nMessage:\n{message}"

            send_mail(
                subject=full_subject,
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=['empiretheguy75@gmail.com'],
                fail_silently=False,
            )
            return JsonResponse({'message': 'Message sent successfully!'})
        except Exception as e:
            return JsonResponse({'message': f'Error: {str(e)}'}, status=500)

    return JsonResponse({'message': 'Method not allowed.'}, status=405)