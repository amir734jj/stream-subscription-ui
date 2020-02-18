import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpecialityNameTable} from '../../../../models/SpecialityEnum';
import Contractor from '../../../../models/entities/Contractor';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contractor-profile',
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.sass']
})
export class ContractorProfileComponent implements OnInit, DoCheck {

  @Input() contractor: Contractor;
  @Output() contractorChange: EventEmitter<Contractor> = new EventEmitter<Contractor>();
  specialities = SpecialityNameTable;

  constructor(private router: Router, ) {
  }

  ngDoCheck() {
    this.contractorChange.next(this.contractor);
  }

  ngOnInit() {
  }

  async addShowcaseProject() {
    await this.router.navigate(['profile', 'contractor', 'showcase', 'add']);
  }
}
