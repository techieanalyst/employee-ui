import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../shared/employee/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: Array<any>;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getAllEmployeesYoungerThanAttribute('25').subscribe(data => {
      this.employees = data.employees;
    });
  }

}
