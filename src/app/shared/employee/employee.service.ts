import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class EmployeeService {

  public API = 'http://localhost:8080/employee-service/v1';
  public GET_YOUNGER_THAN = '/employees/younger/than';
  public BULK_UPLOAD = '/employees/bulkupload';


  constructor(private http: HttpClient) {
  }

  getAllEmployeesYoungerThanAttribute(attribute: string): Observable<any> {
    return this.http.get(this.API + this.GET_YOUNGER_THAN + '/' + attribute, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json').append('Accept', 'application/json'),
      responseType: 'json'
    });
  }

  uploadBulkEmployees(): Observable<any> {
    const formData = new FormData();
    return this.http.post(this.API + this.BULK_UPLOAD, formData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json').append('Accept', 'application/json'),
      responseType: 'json'
    });
  }

}
