import { Component, Input, OnInit } from '@angular/core';
import { ApprovsService } from '../services/approvs.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @Input() id;

  constructor(private approvsService: ApprovsService) { }

  ngOnInit(): void {
    this.id=window.localStorage.getItem("user_id")
    console.log("@@@@@@@"+window.localStorage.getItem("user_id")+"@@@@@@@@");
    console.log("@@@@");
  }

}
