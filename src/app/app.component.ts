import { Component, ViewChild } from '@angular/core';
import { GamesComponent } from './components/games.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(GamesComponent)
  gameCompo!: GamesComponent
}
