import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GameService } from './service/game.service'
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { InputComponent } from './components/input.component';
import { GamesComponent } from './components/games.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
