import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }

  user: any = {
    user_id : "BimaarAadmi707",
    user_currMed : 4,
  }

  userMedications : any[] = [
    {
      med_name: "Aspirine",
      med_time: "2 AM",
      med_drug: "Apirine 200mg FluroscentLight3 Octabit",
      med_stock: 10,
    },
    {
      med_name: "Pill 2",
      med_time: "23 AM",
      med_drug: "Apirine 200mg FluroscentLight3 Octabit",
      med_stock: 40,
    },
    {
      med_name: "Shardi ni dava",
      med_time: "4 AM",
      med_drug: "Apirine 200mg FluroscentLight3 Octabit",
      med_stock: 10,
    },
    {
      med_name: "Dolo",
      med_time: "8 AM",
      med_drug: "Dolozc agdf",
      med_stock: 100,
    },
    {
      med_name: "Pill 2",
      med_time: "23 AM",
      med_drug: "Apirine 200mg FluroscentLight3 Octabit",
      med_stock: 40,
    },
    {
      med_name: "Shardi ni dava",
      med_time: "4 AM",
      med_drug: "Apirine 200mg FluroscentLight3 Octabit",
      med_stock: 10,
    },
    {
      med_name: "Dolo",
      med_time: "8 AM",
      med_drug: "Dolozc agdf",
      med_stock: 100,
    }
  ]

}
