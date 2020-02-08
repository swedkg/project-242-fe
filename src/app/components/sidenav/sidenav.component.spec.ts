import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";

import { SidenavComponent } from "./sidenav.component";

import { SidenavService } from "../../_services/sidenav.service";
import { UserService } from "../../_services/user.service";

// describe('SidenavComponent', () => {
//   let component: SidenavComponent;
//   let fixture: ComponentFixture<SidenavComponent>;

//   // let testBedSidenavService = SidenavService
//   // let testBedUserService = UserService

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ SidenavComponent ],
//       providers:[SidenavService, UserService]
//     })
//     // .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SidenavComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();

//     // testBedSidenavService = TestBed.get(SidenavService);
//     // testBedUserService = TestBed.get(UserService);
//   });

//   it('should be created',
//   inject([SidenavService, UserService], () => {
//     expect(component).toBeTruthy();
//   })
// );

// //   expect(component).toBeTruthy();
//   // () => {
//   // }

// });
