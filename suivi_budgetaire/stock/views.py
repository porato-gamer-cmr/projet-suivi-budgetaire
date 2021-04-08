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
        user=User.objects.get(id=request.headers['Authorization'].split(' ')[1])
        approvs = Approvs.objects.create(validation=0, message='', user=user)
        approvs.save()
        for a in app:
            b = json.loads(a)
            p = Produit.objects.get(pk=b["id"])
            approv = Approv(produit=p, quantite=b["qte"], approvs=approvs)
            approv.save()


    return JsonResponse({'message': 'Enregistrement reussi' })


def allapprovs(request):
    approv = Approv.objects.all()
    approvs=[]
    for a in approv:
        app={
            "name" : a.produit.name,
            "quantite" : a.quantite,
            "approvs" : a.approvs.id,
            "user_name": a.approvs.user.name,
            "instant": a.approvs.instant
            }
        approvs.append(app)
    return JsonResponse(approvs, content_type="application/json", safe=False)


def listapprovs(request):
    approv = Approv.objects.filter(approvs__user__id=request.headers['Authorization'].split(' ')[1])
    approvs=[]
    for a in approv:
        app={
            "name" : a.produit.name,
            "quantite" : a.quantite,
            "approvs" : a.approvs.id,
            "user_name": a.approvs.user.name,
            "instant": a.approvs.instant
            }
        approvs.append(app)
    return JsonResponse(approvs, content_type="application/json", safe=False)

def listinferiorapprovs(request):
    approv = Approv.objects.filter(approvs__user__superieur__id=request.headers['Authorization'].split(' ')[1])
    #approv = Approv.objects.filter(approvs__validation=1)
    approvs=[]
    for a in approv:
        app={
            "name" : a.produit.name,
            "quantite" : a.quantite,
            "approvs" : a.approvs.id,
            "user_name": a.approvs.user.name,
            "instant": a.approvs.instant
            }
        print(a.approvs.id)
        print('#######')
        approvs.append(app)
    return JsonResponse(approvs, content_type="application/json", safe=False)


def listrmgapprovs(request):
    approv = Approv.objects.filter(approvs__validation=1)
    approvs=[]
    for a in approv:
        app={
            "name" : a.produit.name,
            "quantite" : a.quantite,
            "approvs" : a.approvs.id,
            "user_name": a.approvs.user.name,
            "instant": a.approvs.instant
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


@csrf_exempt
def decisionapprovs(request):
    if request.method == 'POST':
        req = request.body
        my_json = req.decode('utf8').replace("'", '"')
        data=json.loads(my_json)
        Approvs.objects.filter(id=data["id"]).update(validation=data["decision"])

    return JsonResponse({'message': 'Enregistrement reussi' })

@csrf_exempt
def signup(request):

    if request.method == 'POST':
        req = request.body
        my_json = req.decode('utf8').replace("'", '"')
        data = json.loads(my_json)
        if(data["superieur"]):
            user = User.objects.get(id=data["superieur"])
            User.objects.create(name=data["name"], password=data["password"], superieur=user, role=data["role"])
        else:
            User.objects.create(name=data["name"], password=data["password"], role=data["role"])

        for a in User.objects.all():
            print(a.superieur)
        
    return JsonResponse({'message': 'Inscription reussi' })

@csrf_exempt
def signin(request):
    if request.method == 'POST':
        req = request.body
        my_json = req.decode('utf8').replace("'", '"')
        data = json.loads(my_json)
        try:
            user = User.objects.get(name=data["name"], password=data["password"])
        except User.DoesNotExist:
            user=''

        if(user):
            response = { 'userId' : user.pk, 'role': user.role }
        else:
            response = { 'error' : 'nom ou mot de passe incorrect' } 

    return JsonResponse(response)   

@csrf_exempt
def listuser(request):
    users=User.objects.all()

    return JsonResponse([user.serialize() for user in User.objects.all()], safe=False) 