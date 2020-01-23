import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import ProductsPricing from 'src/app/models/ProductsPricing.model';
import Text from '../../../assets/i18n/en.json';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

//  The modal component is a dynamic component where the information showed in the component is received
//  as a @Input (Angular way of comunication between components).
//  The component is called in the AppComponent using its selector (<app-modal />).
//  It is design to execute a function in the component that implements it by instancing the EventEmitter class (Angular).
//  Uses Bootstrap.


export class ModalComponent {

  texts: any = Text.modal;
  id: string;
  @Input() product: any;
  @Output() functionToEmit = new EventEmitter<string>();


  onEmit() {
    this.functionToEmit.emit(this.id);
  }

  findProductPrice() {
    for (const price in ProductsPricing) {
      if (price === this.product.productId) {
        return ProductsPricing[this.product.productId];
      }
    }
  }

}
