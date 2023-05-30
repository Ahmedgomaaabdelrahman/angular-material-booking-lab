import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
 
})
export class SearchComponent implements OnInit{
  addressForm = this.fb.group({
    capacity: [null, Validators.required],
    avail_date: [null, Validators.required ],
    hours: [null, Validators.required , Validators.min(1), Validators.max(24)],
  });

  showDateRow: boolean = false;
  showHoursRow: boolean = false;

  constructor(private fb: FormBuilder, private reserveService: ReservationService) {}
  
  ngOnInit(){
    this.reserveService.initValue.next(true)
    this.reserveService.labsChanged.subscribe((labs: any[]) => {
      if(labs.length) {
        this.showDateRow = true;
      }
      else {
        this.showDateRow = false;
      }
     
    });


    this.reserveService.filteredLabsChanged.subscribe((filteredLabs: any[]) => {
      if(filteredLabs.length) {
        this.showHoursRow = true;
      }
      else {
        this.showHoursRow = false;
      }
     
    });

  }

  onSubmit(): void {
    alert('Thanks!');
  }

  searchWithCapacity(){
    if(this.addressForm.controls.capacity.value){
      this.reserveService.initValue.next(false)
      this.reserveService.search(this.addressForm.controls.capacity.value);
    }
    else {
      this.reserveService.initValue.next(true)
      this.addressForm.reset()
    }
    
  }

  searchWithDate(){
    if(this.addressForm.controls.avail_date.value) {
      const avail_date = (new Date(this.addressForm.controls.avail_date.value)).toLocaleDateString('en-US', {weekday: 'long'});
      console.log(avail_date)
      this.reserveService.searchWithDay(avail_date);
    }
    else { 
      this.reserveService.currentSearchDay.next('')
    }
  }
}
