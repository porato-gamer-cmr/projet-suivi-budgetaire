import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApprovsService {

  url="http://172.16.16.195:8000/stock/";
  p: Boolean;

  constructor(private httpClient: HttpClient) { }

  approvsSubject = new Subject<any[]>();
  approvs=[];

  emitApprovsSubject(){
    this.approvsSubject.next(this.approvs.slice());
  }

  listApprovs(){
    this.httpClient.get(this.url + "listapprovs")
      .subscribe(
        (data: any[])=>{
          this.approvs = data;
          this.emitApprovsSubject();
          console.log("reussite lors de la récuperation des approvs");
        },
        (error)=>{
          console.log("probleme lors de la récuperation des approvs" + error);
        }
      );
  }

  addApprov(approv){
    this.httpClient.post<any[]>(this.url + "addapprovs/", approv)
      .subscribe(
        (data)=>{
           this.listApprovs();
        },
        (error)=>{
          console.log("Erreur lors de l ajout de approv"+ error);
        }
      );
  }


  modifApprovs(approv){
    this.httpClient.post<any[]>(this.url + "modifapprovs/", approv)
      .subscribe(
        (data)=>{
           this.listApprovs();
        },
        (error)=>{
          console.log("Erreur lors de l ajout de approv"+ error);
        }
      );
  }

  decision(decision, id){
    let value={
      decision: decision,
      id: id
    }
    this.httpClient.post<any[]>(this.url + "decisionapprovs/", value)
      .subscribe(
        (data)=>{
           this.listApprovs();
        },
        (error)=>{
          console.log("Erreur lors de l ajout de approv"+ error);
        }
      );
  }

  
}
