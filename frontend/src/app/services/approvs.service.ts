import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApprovsService {

  url="http://172.16.16.195:8000/stock/";
  p: Boolean;
  headers = new HttpHeaders().set('Authorization', 'Bearer '+window.localStorage.getItem("user_id"));

  constructor(private httpClient: HttpClient) { }

  approvsSubject = new Subject<any[]>();
  rmgApprovsSubject = new Subject<any[]>();
  inferiorApprovsSubject = new Subject<any[]>();
  approvs=[];
  rmgApprovs=[];
  inferiorApprovs=[];


  emitApprovsSubject(){
    this.approvsSubject.next(this.approvs.slice());
  }
  emitRmgApprovsSubject(){
    this.rmgApprovsSubject.next(this.rmgApprovs.slice());
  }
  emitInferiorApprovsSubject(){
    this.inferiorApprovsSubject.next(this.inferiorApprovs.slice());
  }

  listApprovs(){
    this.httpClient.get(this.url + "listapprovs", {'headers':this.headers})
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

  listRmgApprovs(){
    this.httpClient.get(this.url + "listrmgapprovs", {'headers':this.headers})
      .subscribe(
        (data: any[])=>{
          this.rmgApprovs = data;
          this.emitRmgApprovsSubject();
          console.log("reussite lors de la récuperation des approvs rmg");
        },
        (error)=>{
          console.log("probleme lors de la récuperation des approvs" + error);
        }
      );
  }

  listInferiorApprovs(){
    this.httpClient.get(this.url + "listinferiorapprovs", {'headers':this.headers})
      .subscribe(
        (data: any[])=>{
          this.inferiorApprovs = data;
          this.emitInferiorApprovsSubject();
          console.log("reussite lors de la récuperation des approvs inferieurs");
        },
        (error)=>{
          console.log("probleme lors de la récuperation des approvs" + error);
        }
      );
  }

  addApprov(approv,b){
    this.httpClient.post<any[]>(this.url + "addapprovs/", approv, {'headers':this.headers})
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
