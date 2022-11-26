import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import { NgToastService } from 'ng-angular-popup';
import { AlertifyService } from './alertify.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  constructor(
    private toast: NgToastService,
    private alertify: AlertifyService
  ) {}
  authToken = '12345';
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
      setHeaders: { Authorization: `${this.authToken}` },
    });
    return next.handle(authReq).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;

          this.alertify.error(errorMessage);
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        this.alertify.error(errorMessage);
        return throwError(errorMessage);
      })
      // tap((event: HttpEvent<any>) => {
      //   console.log('ev', event);
      //   if (event instanceof HttpResponse && event.status === 201) {
      //     //this.toastr.success("Object created.");
      //     console.log('ev', event);
      //     this.alertify.success('object created');
      //   }
      // })
    );
  }
}
