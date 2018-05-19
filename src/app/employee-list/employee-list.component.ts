import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../shared/employee/employee.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: Array<any>;
  fileToUpload: File = null;
  alert: any;
  public CONNECTION_UNAVAILABLE = 'unable to connect to the service. please try again later';
  options: Array<string> = ['filter', 'sort'];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getAll();
  }

  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    this.employeeService.uploadBulkEmployees(this.fileToUpload).subscribe(data => {
      this.employees = data.employees;
      this.alert = null;
    }, (error: HttpErrorResponse) => {
      if (error.status === 0) {
        this.alert = this.CONNECTION_UNAVAILABLE;
      } else {
        this.alert = error.error.errors;
      }
    });
  }

  sort(attribute: string) {
    if (attribute.length === 0) {
      this.getAll();
    } else {
      this.employeeService.sortAllEmployeesByAttribute(attribute).subscribe(data => {
        this.employees = data.employees;
        this.alert = null;
        if (this.employees.length === 0) {
          this.alert = 'No entries found!';
        }
      }, (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.alert = this.CONNECTION_UNAVAILABLE;
        } else {
          this.alert = error.error.errors;
        }
      });
    }
  }

  filter(attribute: string) {
    if (attribute.length === 0) {
      this.getAll();
    } else {
      this.employeeService.getAllEmployeesYoungerThanAttribute(attribute).subscribe(data => {
        this.employees = data.employees;
        this.alert = null;
        if (this.employees.length === 0) {
          this.alert = 'No entries found!';
        }
      }, (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.alert = this.CONNECTION_UNAVAILABLE;
        } else {
          this.alert = error.error.errors;
        }
      });
    }
  }

  getAll() {
    this.employeeService.getAll().subscribe(data => {
      this.employees = data.employees;
      this.alert = null;
      if (this.employees.length === 0) {
        this.alert = 'No entries found!';
      }
    }, (error: HttpErrorResponse) => {
      if (error.status === 0) {
        this.alert = this.CONNECTION_UNAVAILABLE;
      } else {
        this.alert = error.error.errors;
      }
    });
  }

}
