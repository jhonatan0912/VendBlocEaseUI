import { Component } from '@angular/core';
import { RestaurantCardComponent } from "../../components/restaurant-card/restaurant-card.component";
import { Outlet } from '../../models/outlet/outlet';
import { ResponseDTO } from '../../models/response/response';
import { OutletService } from '../../data-access/services/outlet/outlet.service';
import { first } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RestaurantCardComponent]
})
export class HomeComponent {

    constructor(private outletService: OutletService){}

    restaurants : Outlet[] = []

    ngOnInit() {
        this.getRestuarants();
    }

    getRestuarants(){
        this.outletService.getOutlets().pipe(first()).subscribe({
            next:(result:ResponseDTO)=>{
                if(result.status){
                    this.restaurants = result.data
                }
                else{
                    console.log("Unable to fetch outlets");
                }
            },
            complete:()=>{

            },
            error:(e)=>{
                console.log(e)
            }
        })
    }
}
