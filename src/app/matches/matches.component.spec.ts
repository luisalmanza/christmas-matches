import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchesComponent } from './matches.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { DataService } from '../shared/services/data/data.service';
import { of } from 'rxjs';
import { mockSinglePlayer, mockTwoPlayers } from '../shared/mocks/mock-players';
import PlayerInterface from '../shared/interfaces/player.interface';


describe('MatchesComponent', () => {
  let component: MatchesComponent;
  let fixture: ComponentFixture<MatchesComponent>;
  let dataService: DataService;
  let singlePlayerData: PlayerInterface;
  let twoPlayersData: PlayerInterface[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchesComponent, LoadingComponent],
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    dataService = TestBed.inject(DataService);
    fixture = TestBed.createComponent(MatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    singlePlayerData = JSON.parse(JSON.stringify(mockSinglePlayer));
    twoPlayersData = JSON.parse(JSON.stringify(mockTwoPlayers['data']));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.matches).toEqual([]);
    expect(component.winnerPlayer).toBeUndefined();
    expect(component.playedCounter).toEqual(0);
    expect(component.roundMessage).toEqual("");
    expect(component.isLastRound).toBe(false);
    expect(component.players).toEqual([]);
  });

  it('should call getPlayers and update properties when newGame is called', () => {
    const mockData = { data: [{ ...singlePlayerData }] }
    jest.spyOn(dataService, 'getPlayers').mockReturnValue(of({ ...mockData }));
    component.newGame();

    expect(dataService.getPlayers).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
    expect(component.players).toEqual(mockData.data);
  });

  it('should update game information after a win', () => {
    const mockData = { data: [...twoPlayersData, ...twoPlayersData] }
    component.players = [...mockData.data];
    component.buildMatches();
    component.updateRound();
    component.win(0, 0);

    expect(component.players[0].looser).toBe(false);
    expect(component.players[1].looser).toBe(true);
    expect(component.playedCounter).toBe(1);
    expect(component.winnerPlayer).toBeUndefined();
  });

  it('should show winner modal when all matches are played and it is the last round', () => {
    const mockData = { data: [{ ...singlePlayerData }, ...twoPlayersData] }
    component.players = [...mockData.data];
    component.buildMatches();
    component.updateRound();
    component.win(0, 0);

    expect(component.players[0].looser).toBe(false);
    expect(component.players[1].looser).toBe(true);
    expect(component.players[2].looser).toBe(true);
    expect(component.winnerPlayer).toEqual(mockData.data[0]);
  });

  it('should update game state for the next round', () => {
    const mockData = { data: [...twoPlayersData, ...twoPlayersData, ...twoPlayersData, ...twoPlayersData] }
    component.players = [...mockData.data];
    component.buildMatches();
    component.updateRound();
    const matchesSize = component.matches.length;

    for (let i = 0; i < matchesSize; i++) {
      component.win(i, 0);
    }

    component.nextRound();

    expect(component.playedCounter).toEqual(0);
    expect(component.round).toEqual(2);
    expect(component.players.length).toEqual(4);
  });
});
