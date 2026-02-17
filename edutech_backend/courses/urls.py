from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_courses, name='get_courses'),
    path('create/', views.create_course, name='create_course'),
    path('payments/', views.get_payments, name='get_payments'),
    path('payment/process/', views.process_payment, name='process_payment'),
    path('<str:course_id>/', views.get_course, name='get_course'),
    path('<str:course_id>/update/', views.update_course, name='update_course'),
    path('<str:course_id>/delete/', views.delete_course, name='delete_course'),
]
