# Generated by Django 3.1.7 on 2021-04-06 10:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Produit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('quantite', models.IntegerField(null=True)),
                ('securite', models.IntegerField(null=True)),
                ('alerte', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('password', models.CharField(max_length=200)),
                ('superieur', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='stock.user')),
            ],
        ),
        migrations.CreateModel(
            name='Approvs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('instant', models.DateTimeField(auto_now_add=True)),
                ('validation', models.IntegerField()),
                ('message', models.CharField(max_length=200)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stock.user')),
            ],
        ),
        migrations.CreateModel(
            name='Approv',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantite', models.IntegerField()),
                ('approvs', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='stock.approvs')),
                ('produit', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='stock.produit')),
            ],
        ),
    ]
