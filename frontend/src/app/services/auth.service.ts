import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

import {tap} from 'rxjs/operators'

import {NativeStorage} from '@ionic-native/native-storage/ngx'

import {EnvService} from './env.service'
import {User} from '../models/User'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token: any;
  TOKEN_KEY = "token";
  TOKEN_TYPE = "token_type";
  ACCESS_TYPE = "access_type";

  constructor(
    private http: HttpClient,
    private storage : NativeStorage,
    private env: EnvService
  ) { }

  /*
    calling the api to get user token. and store it locally.
  */

  setToken(token){
    this.storage.setItem(this.TOKEN_KEY, token)
    .then(() => {
      console.log('Token Stored')
    },
    error => console.error('Error Storing token', error))

    this.token = token;
    this.isLoggedIn = true;
  }

  login(email:string, password:string){
    return this.http.post(this.env.API_URL + 'auth/login',
            {email:email, password:password})
            .pipe(
              tap(
                response => {
                  this.setToken(response['token'])
                  return response;
                }
              )
            );
          }

    // send user detail for registering
    register(fName:string, lName:string, email:string, password:string){
      return this.http.post(this.env.API_URL + 'auth/register',
              {firstName:fName, lastName:lName, email:email, password:password})
              .pipe(
                tap(
                  response => {
                    this.setToken(response['token'])
                    return response;
                  }
                )
              );
    }

    //
    logout(email:string){
        return this.http.post(this.env.API_URL + 'auth/logout',
              {email:email})
              .pipe(
                tap( data => {
                  this.storage.remove(this.TOKEN_KEY);
                  this.isLoggedIn = false;
                  delete this.token;
                  return data;
                })
              );
    }

    userById(){
      const headers = new HttpHeaders({
        'Authorization' : this.token[this.TOKEN_TYPE]+" "+this.token[this.ACCESS_TYPE]
      })

      return this.http.get<User>(this.env.API_URL + 'auth/user',{headers:headers})
            .pipe(
              tap(user => {
                return user;
              })
            )
    }

  getToken(){
      return this.storage.getItem(this.TOKEN_KEY)
            .then(
              data => {
                console.log(data)
                this.token = data;

                if(this.token != null){
                  this.isLoggedIn = true;
                }else{
                  this.isLoggedIn = false;
                }
              },
              error => {
                this.token = null;
                this.isLoggedIn = false;
              }
            );
    }

    authHeader(){
      return new HttpHeaders({ 'Authorization' : this.token[this.TOKEN_TYPE]+" "+this.token[this.ACCESS_TYPE]})
    }
}
