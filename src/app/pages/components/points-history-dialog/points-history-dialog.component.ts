import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PointsHistoryDialogService } from './points-history-dialog.service';

@Component({
  selector: 'app-points-history-dialog',
  standalone: true,
  imports: [

  ],
  templateUrl: './points-history-dialog.component.html',
  styleUrl: './points-history-dialog.component.css'
})
export class PointsHistoryDialogComponent {
  public userId : any = null;
  public pointsHistory: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<PointsHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pointsHistoryDialogService: PointsHistoryDialogService
  ){}

  async ngOnInit(){
    await this.getIdUser();
    await this.getUserPointsHistory()
  }

  async getIdUser(){
    this.userId = await this.pointsHistoryDialogService.getIdUser();
  }

  async getUserPointsHistory(){
    return this.pointsHistoryDialogService.getUserPointsHistory(this.userId).subscribe(
      response => {
        this.pointsHistory = response;
        console.log(this.pointsHistory);
      }
    );
  }

}
