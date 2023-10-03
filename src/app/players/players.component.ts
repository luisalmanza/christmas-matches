import { Component } from '@angular/core';
import { DataService } from '../data.service';
import PlayerInterface from '../shared/interfaces/player.interface';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent {
  players: PlayerInterface[] = [];
  isLoading: boolean = false;
  deletingPlayer: PlayerInterface | undefined;
  private deleteModal: bootstrap.Modal | undefined;
  private deleteToast: bootstrap.Toast | undefined;
  private errorModal: bootstrap.Modal | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.deleteModal = new bootstrap.Modal('#deleteModal');
    this.deleteToast = bootstrap.Toast.getOrCreateInstance("#deleteToast");
    this.errorModal = new bootstrap.Modal('#errorModal');

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
        this.errorModal?.show();
      },
    });
  }

  showDeleteModal(player: PlayerInterface): void {
    this.deletingPlayer = player;
    this.deleteModal?.show();
  }

  deletePlayer(): void {
    this.isLoading = true;
    const id = <string>this.deletingPlayer?._id;
    this.dataService.deletePlayer(id).subscribe({
      next: (playersResponse: { data: {} }) => {
        this.deletingPlayer = undefined;
        this.deleteModal?.hide();
        this.deleteToast?.show();
        this.getPlayers();
      },
      error: error => {
        console.log(error);
        this.isLoading = false;
        this.deleteModal?.hide();
        this.errorModal?.show();
      },
    });
  }
}
