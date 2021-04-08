from django.db import models

# Create your models here.
class Produit(models.Model):
    name=models.CharField(max_length=200, unique=True)
    quantite=models.IntegerField(null=True)
    securite = models.IntegerField(null=True)
    alerte = models.IntegerField(null=True)

    def serialize(self):
        return {
            "id": self.pk,
            "name": self.name,
            "quantite": self.quantite,
            "securite": self.securite,
            "alerte": self.alerte
        }

    def __str__(self):
        return self.name

class User(models.Model):
    name = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    superieur = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    role = models.CharField(max_length=200, default="normal")

    def serialize(self):
        return {
            "id": self.pk,
            "name": self.name,
            "password": self.password,
            "role": self.role
        }

class Approvs(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    instant = models.DateTimeField(auto_now_add=True)
    validation = models.IntegerField()
    message = models.CharField(max_length=200)


class Approv(models.Model):
    produit = models.ForeignKey(Produit, null=True, on_delete=models.CASCADE)
    quantite = models.IntegerField()
    approvs = models.ForeignKey(Approvs, null=True, on_delete=models.CASCADE)
