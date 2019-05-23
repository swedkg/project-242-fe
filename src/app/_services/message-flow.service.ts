import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageFlowService {
  constructor(private http: HttpClient) {}

  private messageFlow = new Subject<any>();

  getAllMessages(): Observable<any[]> {
    let url: string = '../../assets/messages.json';
    return this.http.get<any[]>(url);
  }
}
