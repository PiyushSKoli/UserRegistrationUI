import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { UrlMappings } from '../shared/UrlMappings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  headers: HttpHeaders = new HttpHeaders().set('Content-Type','application/json; charset=utf-8');
  constructor(private http: HttpClient) { }

  public getAllUsers(){
    return this.http.get(environment.baseUrl+UrlMappings.getAllUsersUrl,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})});
  }

  public deleteUser(id): Observable<any> {
    return this.http.delete(environment.baseUrl+UrlMappings.deleteUserUrl+"/"+id,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})});
  }

  public saveUser(userData:any){
    return this.http.post(environment.baseUrl+UrlMappings.saveUpdateUserUrl,userData,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})});
  }

  public getByUserId(userId): Observable<any> {
    return this.http.get(environment.baseUrl+UrlMappings.getByUserIdUrl+"/"+userId,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})});
  }

  public login(login:any){
    return this.http.post(environment.baseUrl+UrlMappings.loginUrl,login);
  }
}
