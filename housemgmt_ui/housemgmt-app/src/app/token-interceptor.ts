import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { SessionStore } from './shared/constants-provider/session-store';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class TokenInterceptor implements HttpInterceptor {
    token: string;
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (
            localStorage.getItem(SessionStore.username) &&
            localStorage.getItem(SessionStore.auth_header)
        ) {
            this.token = localStorage.getItem(SessionStore.auth_header) || '{}'
            request = request.clone({
                setHeaders: {
                    Authorization: this.token
                }
            });
        }
        return next.handle(request);
    }
}