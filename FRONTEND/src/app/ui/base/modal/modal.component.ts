import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngbd-modal-content",
  template: `<div class="modal-header">
      <h4 class="modal-title">Hi there</h4>
    </div>

    <div class="modal-body">
      <p>Hello user</p>
    </div>

    <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>`,
})


export class NgbdModalContent {
  @Input() name;
  constructor(public activeModal:NgbActiveModal) {

  }
}
@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
  encapsulation:ViewEncapsulation.None,
  providers:[NgbModalConfig,NgbModal]
})
export class ModalComponent implements OnInit {

  closeRes : string;

  ngOnInit(): void {
    
  }

  constructor(config:NgbModalConfig,private modalService: NgbModal) {

    config.backdrop='static';
    config.keyboard=true;
  }


  // OPEN MODAL :
  open(content) {
    this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'}).result.then((result)=> {
      this.closeRes = `Close with ${result}`;

    },(reason)=> {
      this.closeRes = `Dismiss ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason:any) {
    if(reason == ModalDismissReasons.ESC){
      return 'by pressing ESC';

    }else if(reason == ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';

    }
    else {
      return `with: ${reason}`;
    }
  }
  openModal() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }



  openCustomModal(content) {
    this.modalService.open(content);
  }

}
