import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public avatars = new Array(
    "https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_1280.png",
    "https://cdn.pixabay.com/photo/2016/04/01/12/11/avatar-1300582__340.png",
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png",
    "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366__340.png",
    "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429__340.png",
    "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916__340.png",
    "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553__340.png",
    "https://cdn.pixabay.com/photo/2016/08/20/05/51/avatar-1606939__340.png",
    "https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635448__340.png",
    "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652__340.png",
    "https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635451__340.png"
  );

  signupform : FormGroup;

  constructor(private fb : FormBuilder,private router:Router,private auth: AuthenticationService) {

    this.createform();

   }
  
  ngOnInit() {
  }

  createform()
  {
    this.signupform = this.fb.group({
      'avatar': ['',[Validators.required]],
      'password': ['',[Validators.required]],
      'name': ['',[Validators.required]],
      'email':['',[Validators.required]]
    });
  }

  avatarselection(item)
  {
    this.signupform.patchValue({avatar:item})
    console.log(this.signupform.value)
  }

  signup(formData : NgForm):void
  {
    // console.log("in the signup function")
    this.auth.signup(formData).subscribe
    ((user) => {
      console.log(`added user ${JSON.stringify(user)}`);
      if(user!==null || user!==undefined)
      {
        this.router.navigate(['login']);
      }
    });
    this.signupform.reset();
    // this.signupformDirective.resetForm();
  }

}
