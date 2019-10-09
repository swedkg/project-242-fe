import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Globals } from '../../assets/globals';
import { SidenavService } from '../_services/sidenav.service';

const BASEURL = 'http://localhost:3000';
const MESSAGES = '/messages';
const FULLFILMENTS = '/fullfilments/';

@Injectable({
  providedIn: 'root'
})
export class MessageFlowService {
  constructor(
    private http: HttpClient,
    private SidenavService: SidenavService
  ) {}

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

  respondToRequest(id: number) {
    // http://localhost:3000/fullfilments/?request_id=1&user_id=1
    // user_id =
    console.log(id, Globals);
    let fullfilment = {
      request_id: id,
      user_id: Globals.id
    };

    return this.http
      .post(BASEURL + FULLFILMENTS, fullfilment, { observe: 'response' })
      .subscribe(response => {
        console.log(response);

        this.SidenavService.setExpanded(id);
        this.SidenavService.setRequestSidenavOpened(false);
        this.SidenavService.setMessagingSidenavOpened(true);
        this.SidenavService.setActiveMessagingTab(0);

        return response.status;
      });
  }

  // addNewRequest(request) {
  //   let url: string = 'http://localhost:3000/requests';

  //   console.log(request);
  //   return this.http.post(url, request, { observe: 'response' }).subscribe(
  //     response => {
  //       console.log(response, response.status);
  //       if (response.status === 201) {
  //         this.newRequesst.next({ request });
  //       } else {
  //         console.log('Something went wrong');
  //       }
  //       return response;
  //     },
  //     err => {
  //       throw err;
  //     }
  //   );
  //   // .pipe(catchError((error: any) => Observable.throw(console.log(error))));
  // }
}
