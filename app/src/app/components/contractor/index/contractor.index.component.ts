import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractorService} from '../../../services/contractor.service';
import Contractor from '../../../models/entities/Contractor';
import {ImageService} from '../../../services/image.service';

@Component({
  selector: 'app-question-index',
  templateUrl: './contractor.index.component.html',
  styleUrls: ['./contractor.index.component.sass']
})
export class ContractorIndexComponent implements OnInit {
  public contractor: Contractor;

  constructor(private route: ActivatedRoute, private router: Router,
              private contractorService: ContractorService, public imageService: ImageService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contractorService.get(params.id).subscribe(res => {
        this.contractor = res;
      });
    });
  }
}
