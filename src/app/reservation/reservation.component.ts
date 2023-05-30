import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{
    labs : any[] = [];
    filteredLabs : any[] = [];
    showSpinner: boolean = false;
    emptyValuesTxt: string  = '' ;
    emptyFilteredLabs: string = ''

    constructor(private reservationService: ReservationService){}

    ngOnInit(): void {

      this.reservationService.initValue.subscribe((showInitMsg) => {
        if(showInitMsg) {
          this.emptyValuesTxt = 'Please Enter Lab Capacity first'
        }
        else {
          this.emptyValuesTxt = 'There is no labs available'
        }
      })


      this.reservationService.showLabsSpinner.subscribe((show) => {
        this.showSpinner = show;
      });

      this.reservationService.labsChanged.subscribe((labs) => {
        this.labs = labs;
        this.filteredLabs = labs
      });
     
      this.reservationService.filteredLabsChanged.subscribe((filteredLabs) => {
        this.filteredLabs = filteredLabs;
      });

    }
}
