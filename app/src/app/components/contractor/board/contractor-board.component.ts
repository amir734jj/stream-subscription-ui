import { Component, OnInit } from '@angular/core';
import {ContractorService} from "../../../services/contractor.service";
import Contractor from "../../../models/entities/Contractor";

@Component({
  selector: 'app-contractor-board',
  templateUrl: './contractor-board.component.html',
  styleUrls: ['./contractor-board.component.sass']
})
export class ContractorBoardComponent implements OnInit {
	public contractors: Contractor[] = [];

  constructor(private contractorService: ContractorService) { }

  ngOnInit() {
  	this.contractorService.getAll().subscribe(contractors => {
  		this.contractors = contractors;
	  })
  }
}
