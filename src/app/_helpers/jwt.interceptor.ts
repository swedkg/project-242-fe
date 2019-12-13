import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../_services/user.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private UserService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let current_user = this.UserService.currentUserDetails;
    if (current_user && current_user.authentication_token) {
      request = request.clone({
        setHeaders: {
          "X-User-Email": current_user.email,
          "X-User-Token": current_user.authentication_token
        }
      });
    }

    return next.handle(request);
  }
}
