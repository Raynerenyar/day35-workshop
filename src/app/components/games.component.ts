import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game, Games } from '../model/model';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games!: Game[]
  returningResultSub$!: Subscription

  constructor(private gameSvc: GameService) { }

  ngOnInit(): void {
    this.returningResultSub$ = this.gameSvc.onReturningResult.subscribe(
      (games) =>
        this.games = games
    )
  }
}
