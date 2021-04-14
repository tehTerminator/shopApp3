import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {
    private state: AuthState = AuthState.LOGGED_OUT;
    /**
     * Holds Current User Data
     */
    user = new BehaviorSubject<User>(
        new User(0, 'Anonymous', 'anonymous', '', 0)
    );

    constructor() { }

    /**
     * Store New User
     * @param userData UserData as Received from Server
     * @param expirationTime UnixTime when Token is about to expire
     * @returns void
     */
    signIn(userData: UserData, expirationTime: number): void {
        const currentTime = (new Date()).getTime();
        if (expirationTime < currentTime) {
            this.state = AuthState.LOGGED_OUT;
            return;
        }

        if (userData.id > 0) {
            const newUser = new User(userData.id, userData.name, userData.username, userData.token, expirationTime);
            this.user.next(newUser);
            this.state = AuthState.LOGGED_IN;
            return;
        }

        this.state = AuthState.LOGGED_OUT;
    }

    /**
     * Remove Stored User
     */
    signOut(): void {
        this.user.next(
            new User(0, 'Anonymous', 'anonymous', '', 0)
        );
        this.state = AuthState.LOGGED_OUT;
    }

    authStarted(): void {
        this.signOut();
        this.state = AuthState.STARTED;
    }

    get username(): string {
        return this.user.value.username;
    }

    get displayName(): string {
        return this.user.value.name;
    }

    get id(): number {
        return this.user.value.id;
    }

    get token(): string|null {
        return this.user.value.token;
    }

    get currentState(): AuthState {
        return this.state;
    }
}

export enum AuthState {
    LOGGED_OUT,
    STARTED,
    LOGGED_IN,
}

export interface UserData {
    id: number;
    name: string;
    username: string;
    token: string;
}
