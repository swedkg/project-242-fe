import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const BASEURL = 'http://localhost:3000';
const MESSAGES = '/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageFlowService {
  constructor(private http: HttpClient) {}

  private messageFlow = new Subject<any>();

  getAllResponseRequests(): Observable<any[]> {
    let url: string = BASEURL;
    return this.http.get<any[]>(url);
  }
  getUserResponses(id: number): Observable<any[]> {
    let url: string = BASEURL + MESSAGES + '?user_id=' + id;
    return this.http.get<any[]>(url);
  }
  getUserRequests(id: number): Observable<any[]> {
    let url: string =
      BASEURL + MESSAGES + '?requester_id=' + id + '&user_id_ne=' + id;
    // ?requester_id=3&user_id_ne=3
    return this.http.get<any[]>(url);
  }
}
