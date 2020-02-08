import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpecialityEnum, SpecialityNameTable} from '../../../models/SpecialityEnum';

@Component({
  selector: 'app-contractor-profile',
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.sass']
})
export class ContractorProfileComponent implements OnInit, DoCheck {

  @Input() speciality: SpecialityEnum[];
  @Output() specialityChange: EventEmitter<SpecialityEnum[]> = new EventEmitter<SpecialityEnum[]>();
  specialities = SpecialityNameTable;

  ngDoCheck() {
    this.specialityChange.next(this.speciality);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
