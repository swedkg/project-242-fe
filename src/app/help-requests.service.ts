import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpRequestsService {
  constructor(private http: HttpClient) {}
  getHelpRequests(): Observable<helpRequest> {
    let url: string = '../../assets/requests.json';
    return this.http.get<helpRequest>(url);
  }
}

interface helpRequest {
  name: string;
}
