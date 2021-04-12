import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApprovsService } from '../services/approvs.service';
import { Subject, Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  url="http://172.16.16.195:8000/stock/";
  users=[];
  usersSubject = new Subject<any []>();
  usersSubscription: Subscription;
  constructor(private httpClient: HttpClient, private route: Router, private approvsServices: ApprovsService) { }

  ngOnInit(): void {
    this.listuser();
  }

  listuser(){
    this.httpClient.get(this.url+"listuser").subscribe(
      (data: any[])=>{
        this.users = data;
      }
    );
  }

  signup(form: NgForm){
    new Notification("bonjour", {body: "Comment etait la journée?"});
  }

}
