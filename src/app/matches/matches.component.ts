import { Component } from '@angular/core';
import PlayerInterface from '../interfaces/player.interface';
import * as bootstrap from 'bootstrap';
import { DataService } from '../data.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent {
  matches: PlayerInterface[][] = [];
  winnerPlayer: PlayerInterface | undefined;
  playedCounter: number = 0;
  roundMessage: string = "";
  isLastRound: boolean = false;
  players: PlayerInterface[] = [];
  private round: number = 0;
  private winnerModal: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.winnerModal = new bootstrap.Modal('#winnerModal');
    this.newGame();
  }

  newGame(): void {
    this.matches = [];
    this.playedCounter = 0;
    this.isLastRound = false;
    this.round = 0;
    this.winnerModal.hide();
    this.getPlayers();
  }

  getPlayers(): void {
    this.dataService.getPlayers().subscribe({
      next: (playersResponse: { data: PlayerInterface[] }) => {
        this.players = [...playersResponse.data];
        this.shufflePlayers(this.players);
        this.buildMatches();
        this.updateRound();
      },
      error: error => {
        console.log(error);
      },
    });
  }

  shufflePlayers(array: PlayerInterface[]): void {
    const playerSize: number = this.players.length;
    for (let i = 0; i < playerSize; i++) {
      const j: number = Math.floor(Math.random() * (playerSize));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  buildMatches(): void {
    const playerSize: number = this.players.length;
    for (let i = 0; i < playerSize; i += 2) {
      if (playerSize % 2 !== 0 && i + 2 > playerSize) {
        // Add one extra player to the last match
        if (playerSize > 1) {
          this.matches[this.matches.length - 1].push(this.players[i]);
        }
      } else {
        this.matches.push([
          this.players[i],
          this.players[i + 1]
        ]);
      }
    }
  }

  win(matchIndex: number, playerIndex: number): void {
    let playedMatch: boolean = false;
    const playerSize = this.matches[matchIndex].length;

    for (let i = 0; i < playerSize; i++) {
      if (this.matches[matchIndex][i].looser) {
        playedMatch = true;
      }

      if (i !== playerIndex) {
        this.matches[matchIndex][i].looser = true;
      }
    }

    this.matches[matchIndex][playerIndex].looser = false;

    if (!playedMatch) {
      this.playedCounter++;
    }

    if (this.playedCounter === this.matches.length && this.isLastRound) {
      this.winnerModal.show();
      this.winnerPlayer = this.matches[matchIndex][playerIndex];
    }
  }

  nextRound(): void {
    this.players = [];
    this.matches.forEach(match => {
      this.players.push(match.filter(player => !player.looser)[0]);
    });

    this.matches = [];
    this.playedCounter = 0;
    this.buildMatches();
    this.updateRound();
  }

  updateRound(): void {
    if (this.players.length <= 3) {
      this.isLastRound = true;
      this.roundMessage = "Final round";
    } else {
      this.round++;
      this.roundMessage = `Round ${this.round}`;
    }
  }
}
