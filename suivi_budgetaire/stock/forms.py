from django import forms
from .models import Produit

class ProduitForm(forms.ModelForm):
    class Meta:
        moddel = Produit
        fields ="__all__"

