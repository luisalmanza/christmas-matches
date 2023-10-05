import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockSinglePlayer, mockTwoPlayers } from '../../mocks/mock-players';
import { mockFile } from '../../mocks/mock-file';
import { environment } from '../../../../environments/environment.development';
import BasicPlayerInterface from '../../interfaces/basic-player.interface';

const BACKEND_URL = environment.apiUrl;

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;
  const playerData: BasicPlayerInterface = {
    name: 'Luis',
    nickname: 'Luisanhello',
    mediaId: 'mediaId',
  };
  const playerId: string = "testId";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });

    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of players', () => {
    const getResponse = { data: [...mockTwoPlayers] };

    service.getPlayers().subscribe((response) => {
      expect(response).toEqual(getResponse);
    });

    const req = httpTestingController.expectOne(`${BACKEND_URL}/players`);
    expect(req.request.method).toBe('GET');
    req.flush(getResponse);
  });

  it('should upload a file', () => {
    const dummyFile: FormData = new FormData();

    service.uploadFile(dummyFile).subscribe((response) => {
      expect(response).toEqual(mockFile);
    });

    const req = httpTestingController.expectOne(`${BACKEND_URL}/storage`);
    expect(req.request.method).toBe('POST');
    req.flush({ data: dummyFile });
  });

  it('should add a player', () => {
    service.addPlayer(playerData).subscribe((response) => {
      expect(response.data).toEqual(mockSinglePlayer);
    });

    const req = httpTestingController.expectOne(`${BACKEND_URL}/players`);
    expect(req.request.method).toBe('POST');
    req.flush({ data: mockSinglePlayer });
  });

  it('should get a player', () => {
    const getResponse = { data: [{ ...mockSinglePlayer }] };

    service.getPlayer(playerId).subscribe((response) => {
      expect(response).toEqual(getResponse);
    });

    const req = httpTestingController.expectOne(`${BACKEND_URL}/players/${playerId}`);
    expect(req.request.method).toBe('GET');
    req.flush(getResponse);
  });

  it('should edit a player', () => {
    const editResponse = { data: { ...mockSinglePlayer } };

    service.editPlayer(playerId, playerData).subscribe((response) => {
      expect(response).toEqual(editResponse);
    });

    const req = httpTestingController.expectOne(`${BACKEND_URL}/players/${playerId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(editResponse);
  });

  it('should delete a player', () => {
    const deleteResponse = {
      "data": {
        "deleted": 1
      }
    };

    service.deletePlayer(playerId).subscribe((response) => {
      expect(response).toEqual(deleteResponse);
    });

    const req = httpTestingController.expectOne(`${BACKEND_URL}/players/${playerId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(deleteResponse);
  });
});
