import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit{
  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'International',
    'Diploma',
    'Graduate',
    'PG'
  ];

  constructor(private _fb: FormBuilder, private _empService : EmployeeService, private _dialogRef:MatDialogRef<EmpAddEditComponent>,@Inject(MAT_DIALOG_DATA)public data: any) {
    this. empForm = this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:''
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit() {
    if(this.empForm.valid) {
      if(this.data) {
          // console.log(this.empForm.value);
      this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
        next: (val: any) => {
        alert("emp Updated successfully");
        this._dialogRef.close(true);
        },
        error:(err:any) => {
          console.error(err)
        }
      });
      } else {
        // console.log(this.empForm.value);
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
          alert("emp added successfully");
          this._dialogRef.close(true);
          },
          error:(err:any) => {
            console.error(err)
          }
        });
      }
      
    }
  }
}
