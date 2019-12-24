import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractorService} from '../../../services/contractor.service';
import Contractor from '../../../models/entities/Contractor';

@Component({
  selector: 'app-question-index',
  templateUrl: './contractor.index.component.html',
  styleUrls: ['./contractor.index.component.sass']
})
export class ContractorIndexComponent implements OnInit {
  public contractor: Contractor;

  constructor(private route: ActivatedRoute, private router: Router, private contractorService: ContractorService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.getContractor(params.id);
    });
  }

  getContractor(id: string) {
    this.contractorService.get(id).subscribe(res => {
      this.contractor = res;
    });
  }
}
