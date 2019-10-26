import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Contractor from '../../../models/Contractor';
import {ContractorService} from '../../../services/contractor.service';

@Component({
  selector: 'app-question-save',
  templateUrl: './contractor.save.component.html',
  styleUrls: ['./contractor.save.component.sass']
})
export class ContractorSaveComponent implements OnInit {

  public contractor: Contractor;

  constructor(private router: Router, private contractorService: ContractorService) {
    this.contractor = new Contractor();
  }

  ngOnInit() { }

  handleSaveContractor() {
    this.contractorService.save(this.contractor)
      .subscribe(res => {
        this.router.navigate(['./']).then();
      });
  }
}
