import { Component } from '@angular/core';
import { DataService } from '../data.service';
import PlayerInterface from '../interfaces/player.interface';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent {
  players: PlayerInterface[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.dataService.getPlayers().subscribe({
      next: (playersResponse: { data: PlayerInterface[] }) => {
        this.players = [...playersResponse.data];
      },
      error: error => {
        console.log(error);
      },
    });
  }

  deletePlayer(id: string): void {
    this.dataService.deletePlayer(id).subscribe({
      next: (playersResponse: { data: {} }) => {
        this.getPlayers();
      },
      error: error => {
        console.log(error);
      },
    });
  }
}
