import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import PlayerInterface from '../../interfaces/player.interface';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import PhotoInterface from '../../interfaces/photo.interface';
import BasicPlayerInterface from '../../interfaces/basic-player.interface';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<{ data: PlayerInterface[] }> {
    return this.http.get<{ data: PlayerInterface[] }>(`${BACKEND_URL}/players`);
  }

  uploadFile(file: FormData): Observable<{ data: PhotoInterface }> {
    return this.http.post<{ data: PhotoInterface }>(`${BACKEND_URL}/storage`, file);
  }

  addPlayer(playerData: BasicPlayerInterface): Observable<{ data: PlayerInterface }> {
    return this.http.post<{ data: PlayerInterface }>(`${BACKEND_URL}/players`, playerData);
  }

  getPlayer(id: string): Observable<{ data: PlayerInterface }> {
    return this.http.get<{ data: PlayerInterface }>(`${BACKEND_URL}/players/${id}`)
  }

  editPlayer(id: string, playerData: BasicPlayerInterface): Observable<{ data: PlayerInterface }> {
    return this.http.put<{ data: PlayerInterface }>(`${BACKEND_URL}/players/${id}`, playerData);
  }

  deletePlayer(id: string): Observable<{ data: {} }> {
    return this.http.delete<{ data: {} }>(`${BACKEND_URL}/players/${id}`);
  }
}
