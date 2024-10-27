import { Component } from '@angular/core';
import { UserService } from './user.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatList, MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../components/edit-dialog/edit-dialog.component';
import { EditGlobalDialogComponent } from '../components/edit-global-dialog/edit-global-dialog.component';
import { PointsHistoryDialogComponent } from '../components/points-history-dialog/points-history-dialog.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ 
    MatSidenav,
    MatSidenavModule,
    MatToolbar,
    MatList,
    MatListModule,
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  public users: any[] = [];
  public admin: boolean = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {
    console.log(this.userService.getCredentialsLocalStorage());
    this.admin = this.userService.getIfuserIsAdmin();
  }

  ngOnInit() { 
    const userAuth = this.userService.getCredentialsLocalStorage();
    if(!userAuth.token){
      this.router.navigate(['/login']);
      return;
    }
    this.consultUsersAndPoints();
  }

  async logout() {
    await this.userService.logoutUser();
    this.router.navigate(['/login']);
  }
  
  consultUsersAndPoints() {
    console.log('consultUsersAndPoints');
    this.userService.getusersAndPoints().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users)
      }, (error) => {
        console.log(error);
      }
    );
  }

  editPoints(): void{
    const dialogRef = this.dialog.open(EditDialogComponent, {
      height: '500px',
      width: '700px',
      data: { users: this.users },
    });
  }

  editPointsAllUsers(): void{
    const dialogRef = this.dialog.open(EditGlobalDialogComponent, {
      height: '500px',
      width: '700px',
      data: { users: this.users },
    });
  }

  modalHistory(): void{
    const dialogRef = this.dialog.open(PointsHistoryDialogComponent, {
      height: '500px',
      width: '700px',
      data: { users: this.users },
    });
  } 

}