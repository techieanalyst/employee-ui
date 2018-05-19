import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class EmployeeService {

  public API = 'http://localhost:8080/employee-service/v1';
  public GET_YOUNGER_THAN = '/employees/younger/than';
  public GET_SORTED_BY = '/employees/sorted';
  public BULK_UPLOAD = '/employees/bulkupload';
  public GET_ALL = '/employees';


  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + this.GET_ALL, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json').append('Accept', 'application/json'),
      responseType: 'json'
    });
  }

  getAllEmployeesYoungerThanAttribute(attribute: string): Observable<any> {
    return this.http.get(this.API + this.GET_YOUNGER_THAN + '/' + attribute, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json').append('Accept', 'application/json'),
      responseType: 'json'
    });
  }

  sortAllEmployeesByAttribute(attribute: string): Observable<any> {
    return this.http.get(this.API + this.GET_SORTED_BY + '/' + attribute, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json').append('Accept', 'application/json'),
      responseType: 'json'
    });
  }

  uploadBulkEmployees(file: File): Observable<any> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post(this.API + this.BULK_UPLOAD, fd);
  }

}
