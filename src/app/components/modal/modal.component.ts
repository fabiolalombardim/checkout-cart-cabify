import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import ProductsPricing from 'src/app/models/ProductsPricing.model';
import Text from '../../../assets/i18n/en.json';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent{

  texts: any = Text.modal;
  id: string;
  @Input() product: any;
  @Output() functionToEmit = new EventEmitter<string>();


  onEmit() {
    this.functionToEmit.emit(this.id);
  }

  findProductPrice() {
    let currentId = this.product.productId.toLowerCase();
    for (let price in ProductsPricing) {
      if(price === currentId) {
        return ProductsPricing[currentId];
      }
    }
  }

}
