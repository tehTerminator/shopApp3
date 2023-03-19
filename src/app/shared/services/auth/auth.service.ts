import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { AuthStateService } from './auth-state.service';
import { environment } from '../../../../environments/environment';
import { HOUR, UserData } from './../../collection';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    private timer: any = null;
    constructor(
        private http: HttpClient,
        private userStore: AuthStateService,
        private router: Router
    ) {}

    init(): void {
        const userData: UserData = this.getStoredUserData();
        const expirationTime = this.getStoredExpirationTime();
        const currentTime = (new Date()).getTime();

        if (expirationTime > currentTime && userData.id > 0) {
            this.handleAuthentication(userData);
        }
    }

    login(username: string, password: string): Observable<any> {
        this.userStore.authStarted();
        const signInUrl = environment.baseUrl + '/users/login';
        return this.http.post<UserData>(signInUrl, {username, password})
        .pipe(
            tap(userData => {
                this.handleAuthentication(userData);
            }),
            catchError(error => {
                console.log(error);
                throw new Error('Invalid Username or Password');
            })
        );
    }

    signOut(): void {
        this.userStore.signOut();
        localStorage.removeItem('userData');
        localStorage.removeItem('expirationTime');
        this.router.navigate(['/user', 'sign-in']);
    }

    private handleAuthentication(userData: UserData): void {
        const expirationTime = (new Date(userData.updated_at)).getTime() + HOUR;
        this.setAutoSignOut(expirationTime);
        this.userStore.signIn(userData, expirationTime);
        this.storeInLocalStorage(userData, expirationTime);
    }

    private storeInLocalStorage(userData: UserData, expirationTime: number): void {
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('expirationTime', expirationTime.toString());
    }

    private getStoredUserData(): UserData {
        const ud = localStorage.getItem('userData');
        let userData: UserData = {
            id: 0,
            displayName: 'Anonymous',
            username: 'anonymous',
            token: '',
            created_at: '',
            updated_at: ''
        };
        if (!!ud) {
            userData = JSON.parse(ud) as UserData;
        }
        return userData;
    }

    private getStoredExpirationTime(): number {
        let expirationTime = 0;
        const storedExpirationTime = localStorage.getItem('expirationTime');
        if (!!storedExpirationTime) {
            expirationTime = +storedExpirationTime;
        }
        return expirationTime;
    }

    private setAutoSignOut(expirationTime: number): void {
        const currentTime = (new Date()).getTime();
        const timeDiff = expirationTime - currentTime;
        if (timeDiff > 0) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.signOut();
            }, timeDiff);
        }
    }

    ngOnDestroy(): void {
        clearTimeout(this.timer);
    }
}
