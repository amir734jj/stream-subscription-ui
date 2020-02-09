import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Contractor from '../../../models/entities/Contractor';

@Component({
  selector: 'app-contact-contractor',
  templateUrl: './contact-contractor.component.html',
  styleUrls: ['./contact-contractor.component.sass']
})
export class ContactContractorComponent implements OnInit {

	@Input() public contractor: Contractor;
	@Output() closeModalEvent = new EventEmitter<void>();

	ngOnInit() {
	}

	closeModal() {
		this.closeModalEvent.next();
	}
}
