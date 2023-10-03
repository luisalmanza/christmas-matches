import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchesComponent } from './matches/matches.component';
import { PlayersComponent } from './players/players.component';
import { PlayerCreateComponent } from './players/player-create/player-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { HeaderComponent } from './header/header.component';
import { SaveToastComponent } from './shared/components/save-toast/save-toast.component';
import { DeleteToastComponent } from './shared/components/delete-toast/delete-toast.component';
import { ErrorModalComponent } from './shared/components/error-modal/error-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    PlayersComponent,
    PlayerCreateComponent,
    LoadingComponent,
    HeaderComponent,
    SaveToastComponent,
    DeleteToastComponent,
    ErrorModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
