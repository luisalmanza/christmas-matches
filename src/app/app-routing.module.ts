import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesComponent } from './matches/matches.component';
import { PlayersComponent } from './players/players.component';
import { PlayerCreateComponent } from './players/player-create/player-create.component';

const routes: Routes = [
  { path: "", component: MatchesComponent },
  { path: "players", component: PlayersComponent },
  { path: "player-create", component: PlayerCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
