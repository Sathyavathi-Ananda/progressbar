import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/fleet-manager/dashboard.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  tripStartedOn; responseData1;responseData2;posWidth;
  clearVehicalDetails; distanceCovered; distnceToBeCovered; totalDistance; minLeft; posX; posLine; source; destination
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getProgress();
    this.clearVehicalDetails = setInterval(() => {
      this.getProgress();
    }, 10000);
    // this.getProgress();
  }
  getProgress() {
    // this.clearVehicalDetails= setInterval(() => {
    this.dashboardService.getVehicleRoute().subscribe((resp) => {
      if(resp.length>0){
        this.responseData2 =resp;
        sessionStorage.setItem('reponsedetails', JSON.stringify(resp));
      }
      if(resp.length<=0){
        const value = sessionStorage.getItem('reponsedetails');
            this.responseData2 = JSON.parse(value);
            console.log("value of sesion storage",JSON.parse(value));
      }
      // this.responseData1 = resp;
      this.responseData2.forEach(element => {
        console.log("resp of progre", element)
        this.source = element.source;
        this.destination = element.destination;
        this.tripStartedOn = element.trip_started_on;
        this.distanceCovered = element.distancecovered;
        this.distnceToBeCovered = element.distncetobecovered;
        this.totalDistance = element.totaldistance;
        console.log(" this.source", this.source)
        this.minLeft = element.mins_left;
        // this.posX = (((this.distanceCovered / this.totalDistance) * 100)) + '%';
        // this.posLine = (((this.distnceToBeCovered / this.totalDistance) * 100)) + '%';
if(this.distanceCovered !=0 && this.totalDistance!=0){
  this.posX = (((this.distanceCovered / this.totalDistance) * 100)) + '%';
  this.posWidth =(((this.distanceCovered / this.totalDistance) * 100)) + '%';
}else{
  this.posX =0+'%';
  this.posWidth = 100+'%';
}
if(this.distnceToBeCovered!=0 && this.totalDistance !=0){
  this.posLine = (((this.distnceToBeCovered / this.totalDistance) * 100)) + '%';
}else{
  this.posLine= 0+'%';
}


      })
    })
    // }, 10000);
  }
  ngOnDestroy() {
    clearInterval(this.clearVehicalDetails);
  }
}
