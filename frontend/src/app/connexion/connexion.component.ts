import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ApprovsService } from '../services/approvs.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  response;
  url="http://172.16.16.195:8000/stock/";
  users=[];
  usersSubject = new Subject<any []>();
  usersSubscription: Subscription;

  constructor(private httpClient: HttpClient, private route: Router, private approvsServices: ApprovsService) { }

  ngOnInit(): void {
    this.listuser();
    this.usersSubscription = this.usersSubject.subscribe(
      (data)=>{
        this.users = data;
      }
    );
  }

  listuser(){
    this.httpClient.get(this.url+"listuser").subscribe(
      (data: any[])=>{
        this.users = data;
        this.usersSubject.next(this.users.slice());
      }
    );
  }

  signin(form: NgForm){
    
    let user={
      name: form.value.name,
      password: form.value.password
    }
    this.httpClient.post<any[]>(this.url+"signin/", user).subscribe(
      (data)=>{
        this.listuser();
        this.approvsServices.response = data;
        this.response = data;

      }
    );
    if(this.response.error){console.log(this.response.error);}
    else{
      window.localStorage.setItem("user_id",this.response["userId"])
      window.localStorage.setItem("role",this.response["role"])
      this.route.navigate(['/approv']);
      
    }
  }

  signup(form: NgForm){
    let user={
      name: form.value.name,
      password: form.value.password,
      superieur: form.value.superieur,
      role: form.value.role
    }
    this.httpClient.post<any[]>(this.url+"signup/", user).subscribe(
      (data)=>{
        this.listuser();
      }
    );
  }

}
