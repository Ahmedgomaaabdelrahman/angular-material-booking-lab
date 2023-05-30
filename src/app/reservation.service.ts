import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  initValue = new Subject<boolean>();
  labsChanged = new Subject<any[]>();
  showLabsSpinner = new Subject<boolean>();
  filteredLabsChanged = new Subject<any[]>();
  currentLabs : any[] = [];
  currentSearchDay = new Subject<string>();

  constructor(private http: HttpClient) { }

  
  search(capacity : string){
    this.showLabsSpinner.next(true);
    
    
    return this.http.post<any[]>('http://localhost:3000/labs/search', {
      capacity
    }).subscribe((labs) => {
      this.currentLabs = labs;
      this.labsChanged.next(labs);
      setTimeout(() => {
        this.showLabsSpinner.next(false);
      }, 1000);
     
    })
  }
 
  searchWithDay(day: string){
    this.showLabsSpinner.next(true);
    this.currentSearchDay.next(day)
    const filteredLabs = [];

    for (const lab of this.currentLabs) {
      const hasAvailableDay = lab.available_times.some((availableDay: any) =>
        availableDay.day.toLowerCase() === day.toLowerCase()
      );

      console.log(hasAvailableDay)
      if (hasAvailableDay) {
        filteredLabs.push(lab);
      }
    }
    console.log(filteredLabs)
    setTimeout(() => {
      this.showLabsSpinner.next(false);
    }, 1000);
    this.filteredLabsChanged.next(filteredLabs);
  }

  reserveLab(id: any){
    this.showLabsSpinner.next(true);
    this.http.get("http://localhost:3000/labs/reserve/"+id).subscribe((reserved: any) => {

      const labIndex = this.currentLabs.findIndex(lab => lab.id == reserved.id);
      this.currentLabs.splice(labIndex, 1)
      this.labsChanged.next(this.currentLabs);
      setTimeout(() => {
        this.showLabsSpinner.next(false);
      }, 1000);
     
    })
  }


}
