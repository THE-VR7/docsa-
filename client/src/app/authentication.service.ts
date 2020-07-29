import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpRequest } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'Application/json', })
};
const httpOptions2 = {
  headers: new HttpHeaders({ 'Content-type': 'Application/json',"Authorization":localStorage.getItem("currentuser")})
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl = 'http://localhost:5000';
  

  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('Reached here');
      console.error(error); // log to console instead
  
      console.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  constructor(private http:HttpClient, private router: Router) { }

  
  signup(formdata : NgForm)
  {
    console.log("in auth service")
    return this.http.post<any>( `${this.apiUrl}/signup`,formdata, httpOptions).pipe(
      tap(user => {
        console.log(user);
      }),
      catchError(this.handleError('signup', []))
    );   
  }

  login(formdata : NgForm)
  {
    // console.log(formdata);
    return this.http.post(`${this.apiUrl}/login`,JSON.stringify(formdata),httpOptions).pipe(
      tap(user => {
        // console.log(user);
        if(user)
        {
        localStorage.setItem('currentuser',JSON.stringify(user));
        // this.isloggedin = true;
      }
      }),
      catchError(this.handleError('getlogin', []))
    );
  }

  logout(id)
  {
    console.log("in authentication logout fucntion")
    return this.http.post(`${this.apiUrl}/logout`,id,httpOptions2).pipe(
      tap(user => {
        console.log("executed logout");
        localStorage.removeItem('currentuser');
        this.router.navigate(['/home']);
      }),
      catchError(this.handleError('error in logging out', []))
    );
    console.log("crossed main function")
  }

  getdocuments()
  {
    return this.http.get(`${this.apiUrl}/allpost`).pipe(
      tap(posts =>{
        // console.log(posts)
        return posts
      }),
      catchError(this.handleError('cant get posts',[]))
    );
  }

  getdocument(id)
  {
    
    return this.http.get(`${this.apiUrl}/post/${id}`,httpOptions2).pipe(
      tap(posts =>{
        console.log(posts)
      }),
      catchError(this.handleError('cant get posts',[]))
    );
  }

  adddoc(data)
  {
    return this.http.post<any>(`${this.apiUrl}/adddocument`,data, httpOptions).pipe(
      tap(user => {
        // console.log(user);
      }),
      catchError(this.handleError('error in adding document', []))
    );
  }

  adduser(documentid,userid)
  {
    // console.log(userid)
    return this.http.put<any>(`${this.apiUrl}/adduser`,{documentid,userid}, httpOptions2).pipe(
      tap(post => {
        console.log(post);
      }),
      catchError(this.handleError('error in adding user', []))
    );
  }

}
