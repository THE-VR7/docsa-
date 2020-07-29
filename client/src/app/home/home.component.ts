import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  docs;
  // data = {
  //   title:"Second document",
  //   body:"This is the main document and it is protected so everyone can not access it",
  //   users:[],
  //   protected:true
  // };
  isloggedin = false;
  constructor(private router:Router,private auth: AuthenticationService) { }

  ngOnInit() {
    if(localStorage.getItem("currentuser")!==null)
    {
      this.isloggedin = true;
      console.log("is logged in is ",this.isloggedin)
    }
    this.getdocuments();
  }

  getdocuments()
  {
    // this.adddocument();
    console.log("Posts function called")
    this.auth.getdocuments()
    .subscribe((posts)=>{
      console.log("Posts are ",posts)
    this.docs = posts;
    // console.log(this.docs)
    });
  }

  // adddocument()
  // {
  //   this.auth.adddoc(this.data)
  //   .subscribe((doc)=>{
  //     console.log(doc)
  //   })
    
  // }


}
