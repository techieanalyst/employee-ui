import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/employee-service/v1/employees/younger/than/25', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json').append('Accept', 'application/json'),
      responseType: 'json'
    });
  }
}
