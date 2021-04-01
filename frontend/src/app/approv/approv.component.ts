import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ApprovsService } from '../services/approvs.service';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-approv',
  templateUrl: './approv.component.html',
  styleUrls: ['./approv.component.css']
})
export class ApprovComponent implements OnInit {

  @Input() d;
  @Input() approvs=[];
  @Input() id;
  @Input() approvsId=[];
  @Input() approvsFilter=[];
  @Input() approvsItems =[];
  @Input() new_produit;
  @Input() quantite;
  @Input() produits;
  @Input() e;
  url="http://172.16.16.195:8000/stock/";
  listproduits=[];
  listproduitsSubject = new Subject<any[]>();
  approvsItemSubject = new Subject<any []>();
  approvsSubscription: Subscription;
  produitsSubscription: Subscription;
  listproduitsSubscription: Subscription;

  constructor(private approvsService: ApprovsService, private produitsService: ProduitsService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.produitsService.listProduits();
    this.produits= this.produitsService.produits;
    this.approvsService.listApprovs();
    this.approvsSubscription = this.approvsService.approvsSubject.subscribe(
      (data)=>{
        this.approvs = data;
        for(let i=0; i<this.approvs.length; i++){
          if(!(this.approvsId.includes(this.approvs[i].approvs))){
            console.log(this.approvs[i].approvs+"@@@");
            this.approvsId.push(this.approvs[i].approvs);
            this.approvsFilter.push(this.approvs[i]);
            console.log("tintin toi la");
          }
        }
      }
    );
    this.listproduitsSubscription = this.listproduitsSubject.subscribe(
      (data)=>{this.listproduits=data;}
    );
    this.produitsSubscription = this.produitsService.produitsSubject.subscribe(
      (data)=>{this.produits=data;}
    );

    

  }

  addApprov(form: NgForm){
      this.approvsService.addApprov(this.listproduits);
    
  }
  search(){}

  updatelistprod(){
    let p = false;
    for(let i=0; i<this.listproduits.length; i++){
      if(this.listproduits[i].id===this.new_produit){
        p=true;
      }
    }
    let name = this.produits.find(e=>e.id==this.new_produit);
    let produit ={
      id: this.new_produit,
      qte: this.quantite,
      name: name.name
    }
    
  if(!p){
    this.listproduits.push(produit);
    this.listproduitsSubject.next(this.listproduits.slice());
  }  
        
  }

  updateitem(){
    let p = false;
    for(let i=0; i<this.approvsItems.length; i++){
      if(this.approvsItems[i].name===this.new_produit){
        p=true;
      }
    }
    let produit ={
      name: this.new_produit,
      quantite: this.quantite,
      approvs: this.id
    }
    
  if(!p){
    this.approvsItems.push(produit);
    this.approvsItemSubject.next(this.approvsItems.slice());
  }  
        
  }


  delete(index){
    this.listproduits.splice(index,1);
    this.listproduitsSubject.next(this.listproduits.slice());
  }

  deleteitem(index){
    this.approvsItems.splice(index,1);
    this.approvsItemSubject.next(this.approvsItems.slice());
  }

  infoApprovs(id){
    this.id=id;
    this.approvsItems = this.approvs.filter(approv=>approv.approvs==id);
  }

  valider(){
    this.d=1;
    this.approvsService.decision(this.d, this.id);
  }
  rejeter(){
    this.d=2;
    this.approvsService.decision(this.d, this.id);
  }
  annuler(){
    this.d=3;
    this.approvsService.decision(this.d, this.id);
  }


  modifApprovs(){
    this.approvsService.modifApprovs(this.approvsItems);
    console.log("bonjour");
  }


}
