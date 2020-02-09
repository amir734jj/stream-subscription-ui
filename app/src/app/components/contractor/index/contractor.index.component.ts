import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractorService} from '../../../services/contractor.service';
import Contractor from '../../../models/entities/Contractor';
import {ImageService} from '../../../services/image.service';
import {SpecialityToString} from '../../../models/SpecialityEnum';
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-question-index',
  templateUrl: './contractor.index.component.html',
  styleUrls: ['./contractor.index.component.sass']
})
export class ContractorIndexComponent implements OnInit {
	modalRef: BsModalRef;
  public contractor: Contractor;
  public specialityToString = SpecialityToString;

  constructor(private route: ActivatedRoute, private router: Router,
              private contractorService: ContractorService, public imageService: ImageService,
              private modalService: BsModalService) {
  }

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template, { class: "modal-lg" });
	}

	closeModal() {
  	this.modalRef.hide();
	}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contractorService.get(params.id).subscribe(res => {
        this.contractor = res;
      });
    });
  }
}
