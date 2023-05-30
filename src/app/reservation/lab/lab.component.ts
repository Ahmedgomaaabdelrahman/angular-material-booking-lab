import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReservationService } from 'src/app/reservation.service';
import { ReserveDialogComponent } from 'src/app/reserve-dialog/reserve-dialog.component';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit , OnDestroy{

  @Input() labData : any;
  currentSearchDay: any = ''
  constructor(private reservationService: ReservationService,private dialog: MatDialog){

  }
  ngOnInit(){
    this.reservationService.currentSearchDay.subscribe((currentSearchDay) => {
      this.currentSearchDay = this.labData.available_times.find((day: any) => day.day == currentSearchDay.toLocaleLowerCase());
    });

  }


  onReserveLab(){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;


      dialogConfig.data = {
        searchDate: this.currentSearchDay,
        labName: this.labData.name
      };
      const dialogRef =  this.dialog.open(ReserveDialogComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(
        data => { if(data) this.reservationService.reserveLab(this.labData.id)}
      );
  }
  ngOnDestroy(){
    this.currentSearchDay = '';
  }
}
