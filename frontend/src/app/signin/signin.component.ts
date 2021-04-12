import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  response;
  url="http://172.16.16.195:8000/stock/";
  constructor(private httpClient: HttpClient, private route: Router) { }

  ngOnInit(): void {
  }
  signin(form: NgForm){
    
    let user={
      name: form.value.name,
      password: form.value.password
    }
    this.httpClient.post<any[]>(this.url+"signin/", user).subscribe(
      (data)=>{
        this.response = data;
        if(this.response.error){console.log(this.response.error);}
        else{
          window.localStorage.setItem("user_id",this.response["userId"])
          window.localStorage.setItem("role",this.response["role"])
          this.route.navigate(['/approv']);
      
    }
      }
    );
    
  }

}
