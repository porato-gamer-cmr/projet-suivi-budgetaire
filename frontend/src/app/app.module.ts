import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { ApprovComponent } from './approv/approv.component';
import { ReapprovComponent } from './reapprov/reapprov.component';
import { StatsComponent } from './stats/stats.component';
import { ProduitsService } from './services/produits.service';
import { ConnexionComponent } from './connexion/connexion.component';
import { TestComponent } from './test/test.component';

const appRoutes: Routes = [
  {path: 'produits', component: ProduitsComponent},
  {path: 'approv', component: ApprovComponent},
  {path: 'reapprov', component: ReapprovComponent},
  {path: 'stats', component: StatsComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'test', component: TestComponent},
  {path: '', redirectTo: 'connexion', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    ApprovComponent,
    ReapprovComponent,
    StatsComponent,
    ConnexionComponent,
    TestComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [ProduitsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
