import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Game } from '../model/model';
import { GameService } from '../service/game.service';
import { GamesComponent } from './games.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnDestroy {

  inputForm!: FormGroup
  inputFormSub$!: Subscription
  onInputFormValueChange = new Subject<number>

  returningResultSub$!: Subscription
  games!: Game[]

  NUM_GAMES_PER_PAGE = [5, 6, 7, 8, 9, 10]

  constructor(private fb: FormBuilder, private gameSvc: GameService) { }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      num: this.fb.control<number>(5),
    })

    this.inputFormSub$ = this.inputForm.valueChanges.subscribe(
      (resp) => {
        console.log(resp)
        this.gameSvc.limit = resp.num
        this.gameSvc.onGettingsGames.next(true)
      }
    )
    this.returningResultSub$ = this.gameSvc.onReturningResult.subscribe(
      games => this.games = games
    )

  }

  ngOnDestroy(): void {
    this.returningResultSub$.unsubscribe()
  }

  next() {
    this.gameSvc.offset += this.gameSvc.limit
    this.gameSvc.onGettingsGames.next(true)
  }

  previous() {
    let offsetValue = this.gameSvc.offset
    if ((offsetValue - this.gameSvc.limit) < 0) {
      this.gameSvc.offset = 0
    } else {
      this.gameSvc.offset -= this.gameSvc.limit
    }
    this.gameSvc.onGettingsGames.next(true)
  }
}
