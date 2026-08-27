import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { ItemResponse } from "@core/interfaces/item-response";
import { ISession, Session } from "@core/models/session";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
    private http = inject(HttpClient);
    private baseUrl = `${environment.apiUrl}/api/v1/auth`;

    private _session = signal<Session | null>(null);
    public session = this._session.asReadonly();

    /**
     * Authenticates against MMD Pawn credentials, then loads the resulting session.
     */
    public login(username: string, password: string, rememberMe: boolean): Observable<Session | null> {
        return this.http.post<ItemResponse<null>>(`${this.baseUrl}/login`, {
            username: username,
            password: password,
            rememberMe
        }).pipe(switchMap(() => this.fetchSession()));
    }

    /**
     * Ends the current session on the backend and clears it locally.
     */
    public logout(): Observable<true> {
        return this.http.post<ItemResponse<null>>(`${this.baseUrl}/logout`, {}).pipe(
            tap(() => this._session.set(null)),
            map(() => true)
        );
    }

    /**
     * Loads the current session from the backend's session cookie, if any, and updates `session`.
     */
    public fetchSession(): Observable<Session | null> {
        return this.http.get<ItemResponse<ISession | null>>(`${this.baseUrl}/session`).pipe(
            map(res => res.data ? Session.fromJSON(res.data) : null),
            tap(session => this._session.set(session))
        );
    }
}