import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PlayerCreateComponent } from './player-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { DataService } from '../../shared/services/data/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockSinglePlayer } from '../../shared/mocks/mock-players';
import { mockFile } from '../../shared/mocks/mock-file';
import { SaveToastComponent } from '../../shared/components/save-toast/save-toast.component';

describe('PlayerCreateComponent', () => {
  let component: PlayerCreateComponent;
  let fixture: ComponentFixture<PlayerCreateComponent>;
  let dataService: DataService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerCreateComponent, LoadingComponent, SaveToastComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              has: (param: string) => param === "playerId",
              get: (param: string) => "playerId",
            } as ParamMap),
          }
        },
        DataService
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule]
    });

    dataService = TestBed.inject(DataService);
    route = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(PlayerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call editPlayer on submit when EDIT mode', () => {
    component.mode = 'EDIT';
    component.playerForm.setValue({
      name: 'Luis',
      nickname: 'Luisanhello',
      filename: 'file.jpg',
    });
    const editResponse = { data: { ...mockSinglePlayer } };
    const editPlayerSpy = jest.spyOn(dataService, 'editPlayer').mockReturnValue(of(editResponse));

    component.submitForm();

    expect(editPlayerSpy).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('should handle errors if editPlayer fails', () => {
    component.mode = 'EDIT';
    component.playerForm.setValue({
      name: 'Luis',
      nickname: 'Luisanhello',
      filename: 'file.jpg',
    });
    const error: Error = new Error('Edit error message');
    const editPlayerSpy = jest.spyOn(dataService, 'editPlayer').mockReturnValue(throwError(() => error));
    const consoleErrorSpy = jest.spyOn(console, 'log');

    component.submitForm();

    expect(editPlayerSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(component.isLoading).toBe(false);
  });

  it('should upload a new file on submit when EDIT mode', () => {
    component.mode = 'EDIT';
    component.playerForm.setValue({
      name: 'Luis',
      nickname: 'Luisanhello',
      filename: 'file.jpg',
    });
    component.fileHolder = new File([""], "filename");

    const editResponse = { data: { ...mockSinglePlayer } };
    const fileResponse = { data: { ...mockFile } };
    const uploadFileSpy = jest.spyOn(dataService, 'uploadFile').mockReturnValue(of(fileResponse));
    const editPlayerSpy = jest.spyOn(dataService, 'editPlayer').mockReturnValue(of(editResponse));

    component.submitForm();

    expect(uploadFileSpy).toHaveBeenCalled();
    expect(editPlayerSpy).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('should call addPlayer on submit in CREATE mode', () => {
    component.mode = 'CREATE';
    component.playerForm.setValue({
      name: 'Luis',
      nickname: 'Luisanhello',
      filename: 'file.jpg',
    });
    const addResponse = { data: { ...mockSinglePlayer } };
    const fileResponse = { data: { ...mockFile } };
    const uploadFileSpy = jest.spyOn(dataService, 'uploadFile').mockReturnValue(of(fileResponse));
    const addPlayerSpy = jest.spyOn(dataService, 'addPlayer').mockReturnValue(of(addResponse));

    component.submitForm();

    expect(uploadFileSpy).toHaveBeenCalled();
    expect(addPlayerSpy).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('should handle errors if uploadFile fails', () => {
    component.mode = 'CREATE';
    component.playerForm.setValue({
      name: 'Luis',
      nickname: 'Luisanhello',
      filename: 'file.jpg',
    });
    const error: Error = new Error('Upload error message');
    const uploadFileSpy = jest.spyOn(dataService, 'uploadFile').mockReturnValue(throwError(() => error));
    const consoleErrorSpy = jest.spyOn(console, 'log');

    component.submitForm();

    expect(uploadFileSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(component.isLoading).toBe(false);
  });

  it('should handle errors if addPlayer fails', () => {
    component.mode = 'CREATE';
    const error: Error = new Error('Add error message');
    const addPlayerSpy = jest.spyOn(dataService, 'addPlayer').mockReturnValue(throwError(() => error));
    const consoleErrorSpy = jest.spyOn(console, 'log');

    component.addPlayer({
      name: 'Luis',
      nickname: 'Luisanhello',
      mediaId: 'mediaId',
    });

    expect(addPlayerSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(component.isLoading).toBe(false);
  });

  it('should mark form fields as touched on submit when playerForm is invalid', () => {
    expect(component.name.touched).toBeFalsy();
    expect(component.file.touched).toBeFalsy();

    component.submitForm();

    expect(component.name.touched).toBeTruthy();
    expect(component.file.touched).toBeTruthy();
  });

  it('should update fileHolder and filename field in playerForm', () => {
    const mockEvent: Event = {
      target: {
        files: [
          new File(['content'], 'file.jpg', { type: 'image/jpeg' })
        ]
      }
    } as unknown as Event;

    component.onFileSelected(mockEvent);

    expect(component.fileHolder).toBeDefined();
    expect(component.playerForm.get('filename')?.value).toEqual('file.jpg');
  });

  it('should load player data when "playerId" is present', () => {
    const playerData = { data: { ...mockSinglePlayer } };
    const getPlayerSpy = jest.spyOn(dataService, 'getPlayer').mockReturnValue(of(playerData));

    component.ngOnInit();

    expect(getPlayerSpy).toHaveBeenCalledWith('playerId');
    expect(component.playerForm.value).toEqual({
      name: mockSinglePlayer.name,
      nickname: mockSinglePlayer.nickname,
      filename: mockSinglePlayer.photo.filename,
    });
    expect(component.isLoading).toBe(false);
  });

  it('should handle error when loading player data', () => {
    const error: Error = new Error('Loading error message');
    const getPlayerSpy = jest.spyOn(dataService, 'getPlayer').mockReturnValue(throwError(() => error));
    const consoleErrorSpy = jest.spyOn(console, 'log');

    component.ngOnInit();

    expect(getPlayerSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(component.isLoading).toBe(false);
    expect(component.playerForm.disabled).toBe(true);
  });
});
