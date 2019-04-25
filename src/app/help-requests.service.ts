import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpRequestsService {
  constructor(private http: HttpClient) {}
  getHelpRequests(): Observable<any[]> {
    let url: string = '../../assets/requests.json';
    return this.http.get<any[]>(url);
  }
}

// interface helpRequest {
//   lat: number;
//   lng: number;
//   quote?: string;
//   firstName?: string;
//   lastName?: string;
//   img?: string;
//   stateOfOrigin?: string;
//   cityOfOrigin?: string;
// }
