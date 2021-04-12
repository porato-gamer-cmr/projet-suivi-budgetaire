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
  @Input() allApprovs=[];
  @Input() otherApprovs=[];
  @Input() successApprovs=[];
  @Input() id;

  @Input() approvsId=[];
  @Input() approvsFilter=[];
  @Input() approvsOtherId=[];
  @Input() approvsOtherFilter=[];
  @Input() approvsSuccessId=[];
  @Input() approvsSuccessFilter=[];


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
  otherApprovsSubscription: Subscription;
  successApprovsSubscription: Subscription;

  constructor(private approvsService: ApprovsService, private produitsService: ProduitsService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.produitsService.listProduits();
    this.approvsService.listApprovs();
    this.approvsService.listRmgApprovs();
    this.approvsService.listInferiorApprovs();

    this.produitsSubscription = this.produitsService.produitsSubject.subscribe(
      (data)=>{ this.produits = data; }
    );

    this.otherApprovsSubscription = this.approvsService.inferiorApprovsSubject.subscribe(
      (data)=>{ 
        this.otherApprovs = data;
        for(let i=0; i<this.otherApprovs.length; i++){
          if(!(this.approvsOtherId.includes(this.otherApprovs[i].approvs))){
            this.approvsOtherId.push(this.otherApprovs[i].approvs);
            this.approvsOtherFilter.push(this.otherApprovs[i]);
          }
        } 
      }
    ); 

    if(window.localStorage.getItem("role")=="rmg") {
    this.successApprovsSubscription = this.approvsService.rmgApprovsSubject.subscribe(
      (data)=>{
        this.successApprovs = data;
        for(let i=0; i<this.successApprovs.length; i++){
          if(!(this.approvsSuccessId.includes(this.successApprovs[i].approvs))){
            this.approvsSuccessId.push(this.successApprovs[i].approvs);
            this.approvsSuccessFilter.push(this.successApprovs[i]);
          }
        }
      }
    ); }
    
    this.approvsSubscription = this.approvsService.approvsSubject.subscribe(
      (data)=>{
        this.approvs = data;     
        for(let i=0; i<this.approvs.length; i++){
          if(!(this.approvsId.includes(this.approvs[i].approvs))){
            this.approvsId.push(this.approvs[i].approvs);
            this.approvsFilter.push(this.approvs[i]);
          }       
         
        }

      this.httpClient.get(this.url + "allapprovs")
      .subscribe(
        (data: any[])=>{
          this.allApprovs = data;
          console.log("reussite lors de la récuperation des approvs de tout le monde");
        },
        (error)=>{
          console.log("probleme lors de la récuperation des approvs" + error);
        }
      );
      }
    );
    this.listproduitsSubscription = this.listproduitsSubject.subscribe(
      (data)=>{this.listproduits=data;}
    );
 

  }

  addApprov(form: NgForm){
      this.approvsService.addApprov(this.listproduits,window.localStorage.getItem("user_id"));
    
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
    this.approvsItems = this.allApprovs.filter(approv=>approv.approvs==id);
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
