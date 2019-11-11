import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ContractorService} from '../../services/contractor.service';
import Contractor from '../../models/entities/Contractor';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  public contractors: Contractor[] = [];

  constructor(private router: Router, private contractorService: ContractorService) { }

  ngOnInit() {
    this.getContractors();
  }

  getContractors() {
    this.contractorService.getAll().subscribe(x => {
      this.contractors = x;
    });
  }
}
