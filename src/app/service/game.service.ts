import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Game, Games } from "../model/model";
import { environment } from "../../environments/environment"
import { map, Observable, Subject, Subscription } from "rxjs";

@Injectable()
export class GameService implements OnDestroy {

    // default limit = 5
    limit: number = 5
    // default offset = 0
    offset: number = 0

    gamesSub$!: Subscription
    onGettingsGames = new Subject<boolean>
    gettingGamesSub$!: Subscription
    onReturningResult = new Subject<Game[]>

    constructor(private http: HttpClient) { this.initialise() }

    ngOnDestroy(): void {
        this.gamesSub$.unsubscribe()
        this.gettingGamesSub$.unsubscribe()
    }

    initialise() {
        this.gettingGamesSub$ = this.onGettingsGames.subscribe(() =>
            this.gamesSub$ = this.getGames().subscribe(
                (games) => {
                    this.onReturningResult.next(games)
                }
            )
        )
    }

    getGames(): Observable<Game[]> {
        const params = new HttpParams()
            .set('limit', this.limit)
            .set('offset', this.offset)
        let url = environment.SERVER_URL + '/' + 'games'
        return this.http.get<Games>(url, { params })
            .pipe(
                map((serverResp: any) => {
                    let result = serverResp.games
                    return result
                })
            )
    }
}