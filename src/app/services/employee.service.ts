import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  GetToken(): any {
    throw new Error('Method not implemented.');
  }

  local_API_Url = 'http://localhost:3000/employees'

  constructor(private _http: HttpClient) { }

  addEmployee(data:any) : Observable <any> {
    return this._http.post(this.local_API_Url, data);
  }

  updateEmployee(id:number, data:any) : Observable <any> {
    return this._http.put(this.local_API_Url + `/` + `${id}`, data);
  }

  getEmployeeList() : Observable <any> {
    return this._http.get(this.local_API_Url).pipe(
      catchError(this.handleError)
    );
  }

  deleteEmployee(id:number) : Observable <any> {
    // return this._http.delete(this.local_API_Url + `/` + `${id}`).pipe(
    //   catchError(this.handleDeleteError)
    // );

    return this._http.delete(this.local_API_Url + `/` + "fdf"+ `${id}`).pipe(
      catchError(this.handleDeleteError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errormessage=''
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        errormessage= `Backend returned code ${error.status}, body was: `, error.error;
    }
    // Return an observable with a user-facing error message.
    errormessage+= 'Something bad happened; please try again later.';   
    return throwError(() => new Error(errormessage));
  }


  private handleDeleteError(error: HttpErrorResponse) {
    let errormessage=''
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        errormessage= `Backend returned code ${error.status}, body was: `, error.error;
    }
    // Return an observable with a user-facing error message.
    errormessage+= 'Something bad happened; please try Delete again later.';   
    return throwError(() => new Error(errormessage));
  }
}
