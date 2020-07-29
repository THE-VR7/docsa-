import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform : FormGroup;

  constructor(private fb : FormBuilder,private router:Router,private auth: AuthenticationService) {
    this.createform();
  }

  ngOnInit() {
  }
  createform()
  {
    this.loginform = this.fb.group({
      'password': ['',[Validators.required]],
      'email':['',[Validators.required]]
    });
  }

  login(formData : NgForm):void
  {
    // console.log("in the signup function")
    this.auth.login(formData).subscribe
    ((user) => {
      console.log(`added user ${JSON.stringify(user)}`);
      if(user!==null || user!==undefined)
      {
        this.router.navigate(['home']);
      }
    });
    this.loginform.reset();
    // this.signupformDirective.resetForm();
  }

}
