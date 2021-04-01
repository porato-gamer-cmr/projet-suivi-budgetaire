from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Produit, Approvs, Approv, User 
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.serializers import serialize

# Create your views here.

@csrf_exempt
def listproduits(request):
    produits = Produit.objects.all().order_by('name')
    return JsonResponse([produit.serialize() for produit in produits], safe=False)

@csrf_exempt
def addproduits(request):
    if request.method == 'POST':
        req = request.body
        my_json = req.decode('utf8').replace("'", '"')
        produit = json.loads(my_json)
        name=produit['name']
        quantite=produit['quantite']
        securite=produit['securite']
        alerte=produit['alerte']
        Produit.objects.create( name=name, quantite=quantite, securite=securite, alerte=alerte)
    return JsonResponse({'message': 'Enregistrement reussi' })

@csrf_exempt
def updateproduits(request):
    if request.method == 'POST':
        req = request.body
        my_json = req.decode('utf8').replace("'", '"')
        produit = json.loads(my_json)
        ids=produit['id']
        name=produit['name']
        quantite=produit['quantite']
        securite=produit['securite']
        alerte=produit['alerte']
        Produit.objects.filter(id=ids).update(name=name, quantite=quantite, securite=securite, alerte=alerte)
    return JsonResponse({'message': 'Mise à jour reussi' })

@csrf_exempt
def deleteproduits(request):
    if request.method == 'POST':
        req = request.body
        my_json = req.decode('utf8').replace("'", '"')
        produit = json.loads(my_json)
        ids=produit['index']
        prod = Produit.objects.get(pk=ids)
        prod.delete()
    return JsonResponse({'message': 'Suppression reussi' })


@csrf_exempt
def addapprovs(request):
    if request.method == 'POST':
        req = request.body
        my_json = req.decode('utf8').replace("'", '"')
        my_json = my_json.replace(",{", ";{")
        my_json = my_json.replace("[", "")
        my_json = my_json.replace("]", "")
        app = my_json.split(";")
        approvs = Approvs.objects.create()
        approvs.save()
        for a in app:
            b = json.loads(a)
            p = Produit.objects.get(pk=b["id"])
            approv = Approv(produit=p, quantite=b["qte"], approvs=approvs)
            approv.save()


    return JsonResponse({'message': 'Enregistrement reussi' })


def listapprovs(request):
    approv = Approv.objects.all().order_by('id')
    approvs=[]
    for a in approv:
        app={
            "name" : a.produit.name,
            "quantite" : a.quantite,
            "approvs" : a.approvs.id
            }
        approvs.append(app)
    return JsonResponse(approvs, content_type="application/json", safe=False)


@csrf_exempt
def modifapprovs(request):
    if request.method == 'POST':
        req = request.body
        my_json = req.decode('utf8').replace("'", '"')
        my_json = my_json.replace(",{", ";{")
        my_json = my_json.replace("[", "")
        my_json = my_json.replace("]", "")
        app = my_json.split(";")
        id=json.loads(app[0])
        id=id["approvs"]
        
        Approv.objects.filter(approvs=id).delete()
        for a in app:
            b = json.loads(a)
            p = Produit.objects.get(name=b["name"])
            approvs = Approvs.objects.get(id=id)
            qte = b["quantite"]
            Approv.objects.create(produit=p, quantite=qte, approvs=approvs)

    return JsonResponse({'message': 'Enregistrement reussi' })



def decisionapprovs(request):
    if request.method == 'POST':
        req = request.body
        my_json = req.decode('utf8').replace("'", '"')
        data=json.loads(my_json)
        
        Approvs.objects.filter(id=data["id"])

    return JsonResponse({'message': 'Enregistrement reussi' })


def signup(request):

    if request.method == 'POST':
        req = request.body
        my_json = req.decode('utf8').replace("'", '"')
        data = json.loads(my_json)
        user = User.objects.get(id=data["user"])
        if(user):
            User.objects.create(name=data["name"], password=data["password"], user=user)
        elif:
            User.objects.create(name=data["name"], password=data["password"])

        
    return JsonResponse({'message': 'Inscription reussi' })


def signin(request):
    if request.method == 'POST':
        req = request.body
        my_json = req.decode('utf8').replace("'", '"')
        data = json.loads(my_json)
        user = User.objects.get(name=data["name"], password=data["password"])
        if(user):
            print(user.name)
            response = { 'userId ' : user.pk }
        elif:
            print(user)
            response = { 'error ' : 'nom ou mot de passe incorrect' } 

    JsonResponse(response)   