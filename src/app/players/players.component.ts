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
  isLoading: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.isLoading = true;
    this.dataService.getPlayers().subscribe({
      next: (playersResponse: { data: PlayerInterface[] }) => {
        this.players = [...playersResponse.data];
        this.isLoading = false;
      },
      error: error => {
        console.log(error);
        this.isLoading = false;
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
