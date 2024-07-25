import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private http:HttpClient) { }

  //user identifiy

  isAuthenticated():boolean{
    if(sessionStorage.getItem('token')!==null){
      return true;
    }
    return false;
  }


  //navigation bar access only register person only  incase not register doesnt allow  navigate to login page

  canaccess(){
    if(!this. isAuthenticated()){
      //navigate to login page 
       this.router.navigate(['/login']);
    }
  }

  canauthenticate(){
    if(this. isAuthenticated()){
      //navigate to login page 
       this.router.navigate(['/dashboard']);
    }

  }
//register component class

  register(name:string, email:string, password:string ){
  //register to firebase data
  return this.http
  .post<{idToken:string}>(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDGccYsAenVPxKmXsh0ooy2pM4CZf6gxMw',
      {displayName:name,email,password}

     );
  }

  storeToken(token:string){
    sessionStorage.setItem('token',token);
  }

  login(email:string,password:string){
    return this.http
    .post<{idToken:string}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDGccYsAenVPxKmXsh0ooy2pM4CZf6gxMw',
      {email,password}
    );
  }

  detail(){
    let token = sessionStorage.getItem('token');

    return this.http.post<{users:Array<{localId:string,displayName:string}>}>(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDGccYsAenVPxKmXsh0ooy2pM4CZf6gxMw',
        {idToken:token}
    );
  }

  removeToken(){
    sessionStorage.removeItem('token');
  }
 
}


