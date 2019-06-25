import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageFlowService {
  constructor(private http: HttpClient) {}

  private messageFlow = new Subject<any>();
  private baseUrl: string = 'http://localhost:3000/messages';

  getAllResponseRequests(): Observable<any[]> {
    let url: string = this.baseUrl;
    return this.http.get<any[]>(url);
  }
  getUserResponses(id): Observable<any[]> {
    let url: string = this.baseUrl + '?user_id=' + id;
    return this.http.get<any[]>(url);
  }
}
