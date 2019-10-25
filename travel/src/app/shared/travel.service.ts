import { Injectable } from '@angular/core';
import { FormControl , FormGroup , Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor(public firebase: AngularFireDatabase) { }
  travelList: AngularFireList<any>;

     form = new FormGroup({
     $key: new FormControl(null),
     destination: new FormControl('', Validators.required),
     days: new FormControl('', Validators.required),
     hotel: new FormControl('', Validators.required),
     price: new FormControl('', Validators.required),
     country: new FormControl('', Validators.required),
     img: new FormControl('', Validators.required)
     
     });


         getTravels(){
                 this.travelList = this.firebase.list('travels');
                 return this.travelList.snapshotChanges();
         }

         insertTravel(travel){
                 this.travelList.push({
                         destination: travel.destination,
                         days: travel.days,
                         hotel: travel.hotel,
                         price: travel.price,
                         country: travel.country,
                         img:travel.img
                  });
         }
         populateForm(travel){
            this.form.setValue(travel);
          
         }

         updateTravel(travel){
            this.travelList.update(travel.$key,{
            destination: travel.destination,
            days: travel.days,
            hotel: travel.hotel,
            price: travel.price,
            country: travel.country,
            img:travel.img
    });
  }

          deleteTravel($key: string){
            this.travelList.remove($key);
          }


}