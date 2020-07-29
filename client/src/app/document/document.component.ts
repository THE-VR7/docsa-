import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  sub;
  id;
  document;
  users;
  constructor(private _Activatedroute:ActivatedRoute,private router:Router,private auth: AuthenticationService) { }

  ngOnInit() {
    this.sub = this._Activatedroute.paramMap.subscribe(params =>{
      this.id = params.get('id')
      this.getdocument(this.id);
      

    })
    
  }

  getdocument(id)
  {
    // console.log("Document function called")
    this.auth.getdocument(id)
    .subscribe((posts)=>{
      // console.log("Posts are ",posts)
    this.document = posts;
    this.users = this.document.users
    // console.log(this.document)
    this.adduser();
    });
  }

  adduser()
  {
    let id = JSON.parse(localStorage.getItem('currentuser')).user._id
    // console.log("id is ",id)
    const found = this.users.some(user => user._id === id)
    // console.log("found is ",found)
    if(!found){
    this.auth.adduser(this.document._id,id)
    .subscribe((post)=>{
      console.log("after adding user ",post)
      this.users = post.users
    })
    }
}

logout()
{
  let id = JSON.parse(localStorage.getItem('currentuser')).user._id
  console.log("logout function is called")
  this.auth.logout(id)
  .subscribe((post)=>{
    console.log("inside the subscribe")
    // this.users = post.users
  })
}

}
