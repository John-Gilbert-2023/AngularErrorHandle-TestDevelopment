import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { InterceptorServiceService } from './services/interceptor-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-app';
  errormessage:any;
  errorDelete:any;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empService: EmployeeService, private toastr:ToastrService, private interceptor:InterceptorServiceService) {}

  refresh(): void {
    window.location.reload();
}

  ngOnInit(): void {
    this.getEmployeeList();
  }
    openAndEditEmpForm() {
      const dialogRef = this._dialog.open(EmpAddEditComponent);
      dialogRef.afterClosed().subscribe({
        next:(val) => {
          if (val) {
            this.getEmployeeList();
          }
        }
      })

    }

    getEmployeeList() {
      this._empService.getEmployeeList().subscribe({
        next:(res) => {
          // console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        },
        error:(err) => {
          this.errormessage = err;
          console.log(err);
        }
      })
    }
  

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }



    deleteEmployee(id:number) {
      this._empService.deleteEmployee(id).subscribe({
        next:(res) => {
        alert('Delete SUccessfully');
        this.getEmployeeList();
        },
        error:(err) => {
          this.errorDelete = err;
          console.log(err);
          // this.toastr.error(this.errorDelete, 'Error', {
          //   timeOut: 3000,
          //  });
        }
      })
    }

    openEditForm(data: any) {
      const dialogRef = this._dialog.open(EmpAddEditComponent,{
        data
      });

      dialogRef.afterClosed().subscribe({
        next:(val) => {
          if (val) {
            this.getEmployeeList();
          }
        }
      })
    }
}
