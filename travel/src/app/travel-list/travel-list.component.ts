import { Component, OnInit } from '@angular/core';
import { TravelService } from "../shared/travel.service";//added injection

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css']
})
export class TravelListComponent implements OnInit {
travelArray =[]; // new array it will contain travel from database

showDeletedMessage : boolean;// added

searchText:string = "";// search bar text

//added object travelService
constructor(public travelService: TravelService) { }

  ngOnInit() {//get travel from database
  	this.travelService.getTravels().subscribe(
                 (list) => {
                         this.travelArray = list.map( (item) => {
                                return {
                                        $key : item.key,
                                        ...item.payload.val()
                                }
                        })
                 });
  }



    onDelete($key){
         if(confirm("Are you sure you want to delete this record?")){
            this.travelService.deleteTravel($key);
            this.showDeletedMessage = true;
            setTimeout(()=> this.showDeletedMessage=false , 3000)
           }
       }

   filterCondition(travel){

   return travel.destination.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 ||
   travel.days.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 ||
   travel.price.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 ||
   travel.hotel.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 ||
   travel.country.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
 }
}
