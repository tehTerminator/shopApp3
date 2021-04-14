import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthStateService, UserData } from './auth-state.service';
import { environment } from './../../environments/environment';
import { HOUR } from '../shared/collection';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private auth: AuthStateService,
        private router: Router
    ) {}

    init(): void {
        const userData: UserData = this.getStoredUserData();
        const expirationTime = this.getStoredExpirationTime();
        const currentTime = (new Date()).getTime();

        if (expirationTime > currentTime && userData.id > 0) {
            this.auth.signIn(userData, expirationTime);
        }
    }

    login(username: string, password: string): Observable<any> {
        this.auth.authStarted();
        const signInUrl = environment.baseUrl + 'user/login';

        console.log('Login Clicked');
        return this.http.post<UserData>(signInUrl, {username, password})
        .pipe(
            tap(userData => {
                console.log(userData);
                const expirationTime = (new Date()).getTime() + HOUR;
                this.auth.signIn(userData, expirationTime);
                this.storeLocal(userData, expirationTime);
            }),
            catchError(error => {
                console.log(error);
                return error.error;
            })
        );
    }

    signOut(): void {
        this.auth.signOut();
        localStorage.removeItem('userData');
        localStorage.removeItem('expirationTime');
        this.router.navigate(['/user', 'sign-in']);
    }

    private storeLocal(userData: UserData, expirationTime: number): void {
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('expirationTime', expirationTime.toString());
    }

    private getStoredUserData(): UserData {
        const ud = localStorage.getItem('userData');
        let userData: UserData = {
            id: 0,
            name: 'Anonymous',
            username: 'anonymous',
            token: ''
        };
        if (!!ud) {
            userData = JSON.parse(ud) as UserData;
        }
        return userData;
    }

    private getStoredExpirationTime(): number {
        let expirationTime = 0;
        const et = localStorage.getItem('expirationTime');
        if (!!et) {
            expirationTime = +et;
        }
        return expirationTime;
    }
}
