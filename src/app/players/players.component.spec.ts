import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersComponent } from './players.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { DataService } from '../shared/services/data/data.service';
import PlayerInterface from '../shared/interfaces/player.interface';
import { mockSinglePlayer, mockTwoPlayers } from '../shared/mocks/mock-players';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeleteToastComponent } from '../shared/components/delete-toast/delete-toast.component';

describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;
  let dataService: DataService;
  let singlePlayerData: PlayerInterface;
  let twoPlayersData: PlayerInterface[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersComponent, LoadingComponent, DeleteToastComponent],
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    dataService = TestBed.inject(DataService);
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    singlePlayerData = JSON.parse(JSON.stringify(mockSinglePlayer));
    twoPlayersData = JSON.parse(JSON.stringify(mockTwoPlayers));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.players).toEqual([]);
    expect(component.deletingPlayer).toBeUndefined();
  });

  it('should call getPlayers and update properties', () => {
    const mockData = { data: [{ ...singlePlayerData }] };
    jest.spyOn(dataService, 'getPlayers').mockReturnValue(of({ ...mockData }));

    component.getPlayers();

    expect(dataService.getPlayers).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
    expect(component.players).toEqual(mockData.data);
  });

  it('should handle errors if getPlayers fails', () => {
    const error: Error = new Error('Error message');
    const getPlayersSpy = jest.spyOn(dataService, 'getPlayers').mockReturnValue(throwError(() => error));
    const consoleErrorSpy = jest.spyOn(console, 'log');

    component.getPlayers();

    expect(getPlayersSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(component.isLoading).toBe(false);
  });

  it('should set deletingPlayer data', () => {
    const playerData: PlayerInterface = { ...singlePlayerData };
    component.showDeleteModal(playerData);

    expect(component.deletingPlayer).toEqual(playerData);
  });

  it('should delete a player and update the list of players', () => {
    const playerData: PlayerInterface = { ...singlePlayerData };
    const deletedResponse = { data: {} };
    const deletePlayerSpy = jest.spyOn(dataService, 'deletePlayer').mockReturnValue(of(deletedResponse));
    const getPlayersSpy = jest.spyOn(component, 'getPlayers');

    component.deletingPlayer = playerData;
    component.deletePlayer();

    expect(deletePlayerSpy).toHaveBeenCalledWith(playerData._id);
    expect(component.deletingPlayer).toBeUndefined();
    expect(getPlayersSpy).toHaveBeenCalled();
  });

  it('should handle errors if deletePlayer fails', () => {
    const playerData: PlayerInterface = { ...singlePlayerData };
    const error: Error = new Error('Delete error message');
    const deletePlayerSpy = jest.spyOn(dataService, 'deletePlayer').mockReturnValue(throwError(() => error));
    const consoleErrorSpy = jest.spyOn(console, 'log');

    component.deletingPlayer = playerData;
    component.deletePlayer();

    expect(deletePlayerSpy).toHaveBeenCalledWith(playerData._id);
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(component.isLoading).toBe(false);
  });
});
