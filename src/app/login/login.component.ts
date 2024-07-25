import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata = {email:"",password:""};
  submit=false;    //property
  loading =false;   //property
  errorMessage="";

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canauthenticate();
  }

  onSubmit(){
    this.loading=true;
    this.auth.login(this.formdata.email, this.formdata.password)
    .subscribe({
      next:data=>{
        // store token
        this.auth.storeToken(data.idToken);
        console.log('login user id is '+data.idToken);
        this.auth.canauthenticate();
      },
      error:data=>{
        if (data.error.error.message=="INVALID_PASSWORD" || data.error.error.message=="INVALID_EMAIL")
        {
          this.errorMessage ="Invalid Credentials!";
        }
        else{
          this.errorMessage="Unknown ERROR Check API Connection"
        }
      }
    }).add(()=>{
      this.loading = false;
      console.log('login Successfully');
    })
  }
}
