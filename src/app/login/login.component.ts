import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  isLoading = false
  isSubmitted = false
  returnurl: string
  error = ''

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,
    private authenicationService: AuthenticationService, private formBuilder: FormBuilder) {
    if(this.authenicationService.LoggedInUser){
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.returnurl = this.route.snapshot.queryParams["returnurl"] || "/";
  }
  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }

    this.isLoading = true;
    this.authenicationService.login(this.loginForm.controls.userName.value, 
      this.loginForm.controls.password.value)
        .subscribe(result =>{
          this.router.navigate([this.returnurl]);
        },
        error =>{
          this.error = error,
          this.isLoading = false;
        });
  }

}
