import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import {
  catchError,
  Observable,
  throwError,
  BehaviorSubject,
  switchMap,
  filter,
  take,
} from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class InterceptorServiceService implements HttpInterceptor {
  constructor(private inject: Injector, private toastr: ToastrService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    let authreq = request;
    // authreq = this.AddTokenheader(request, this.authservice.GetToken());
    return next.handle(authreq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log("An error Occured");
          } else {
            switch (error.status) {
              case 401:
                console.log(error.statusText + error.status);
                break;
              case 403:
                console.log(error.statusText + error.status);
                break;
              case 404:
                console.log("New error" + error.statusText + error.status);
                console.log(error);
                this.toastr.error(
                  "Error Found: " + error.statusText + error.status,
                  "Error",
                  {
                    timeOut: 3000,
                  }
                );
                break;
              case 503:
                console.log(error.statusText + error.status);
                break;
            }
          }
        } else {
          console.log("error occured");
        }
        return throwError(() => new Error(error.statusText));
      })
    );
  }
}
