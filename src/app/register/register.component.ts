import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formdata = {name:"",email:"",password:""};
  submit = false;
  errorMessage = "";
  loading=false;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canauthenticate();
  }
  onSubmit(){
    this.loading=true;
    this.auth
    .register(this.formdata.name,this.formdata.email,this.formdata.password)
    .subscribe({
      next:data=>{
        //store data token response data
        this.auth.storeToken(data.idToken);
        console.log('register idtoken is '+data.idToken);
        this.auth.canauthenticate();
      },
      error:data=>{
        if (data.error.error.message=="INVALID_EMAIL"){
         
          this.errorMessage="Invalid Email";

        } else if (data.error.error.message=="EMAIL_EXISTS"){
          this.errorMessage="Already Email Exists!";
        }
        else{
          this.errorMessage="unknown ERROR Occur";
        }
      }
    }).add(()=>{
      this.loading=false;
      console.log("register completed");
    })
    
  }
}
