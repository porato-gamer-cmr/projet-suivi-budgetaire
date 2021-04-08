from django.urls import path
from . import views

urlpatterns = [
    path('', views.listproduits),
    path('listproduits/', views.listproduits, name='1'),
    path('addproduits/', views.addproduits, name='2'),
    path('updateproduits/', views.updateproduits, name='3'),
    path('deleteproduits/', views.deleteproduits, name='4'),
    path('addapprovs/', views.addapprovs, name='5'),
    path('modifapprovs/', views.modifapprovs, name='6'),
    path('listapprovs/', views.listapprovs, name='7'),
    path('decisionapprovs/', views.decisionapprovs, name='8'),
    path('signin/', views.signin, name='9'),
    path('signup/', views.signup, name='10'),
    path('listuser', views.listuser, name='11'),
    path('listrmgapprovs/', views.listrmgapprovs, name='12'),
    path('listinferiorapprovs/', views.listinferiorapprovs, name='13'),
    path('allapprovs/', views.allapprovs, name='14')

]