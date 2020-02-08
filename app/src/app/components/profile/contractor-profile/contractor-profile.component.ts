import {Component, OnInit} from '@angular/core';
import {SpecialityEnum, SpecialityNameTable} from '../../../models/SpecialityEnum';

@Component({
  selector: 'app-contractor-profile',
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.sass']
})
export class ContractorProfileComponent implements OnInit {

  speciality: SpecialityEnum;
  specialities = SpecialityNameTable;

  constructor() { }

  ngOnInit() {
  }

}
