import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UrlMappings } from '../shared/UrlMappings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getAllUsers(){
    return this.http.get(environment.baseUrl+UrlMappings.getAllUsersUrl);
  }

  public deleteUser(id): Observable<any> {
    return this.http.delete(environment.baseUrl+UrlMappings.deleteUserUrl+"/"+id);
  }

  public saveUser(userData:any){
    return this.http.post(environment.baseUrl+UrlMappings.saveUpdateUserUrl,userData);
  }

  public getByUserId(userId): Observable<any> {
    return this.http.get(environment.baseUrl+UrlMappings.getByUserIdUrl+"/"+userId);
  }
}
