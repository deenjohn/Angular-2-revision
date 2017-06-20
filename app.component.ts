import { Component } from '@angular/core';
import { ExchangeService } from './exchange.service';
import { NgModel } from "@angular/forms";

@Component({
  selector: 'currency-converter',
  template: `
    <input type="number" [(ngModel)]="baseAmount"
      [class.error]="isInvalid(baseAmount)">
    <currency-select [(selected)]="baseCurrency"></currency-select>
    = <strong>{{targetAmount}}</strong>
    <currency-select [(selected)]="targetCurrency"></currency-select>
    <br><br>
     <button (click)="logControl(ctrl)">log</button>
    <input [(ngModel)]="name" #ctrl="ngModel" required>
    <p>Value: {{ name }}</p>
    <p>Valid: {{ ctrl.valid }}</p>
    
  `,
  styles: [`
    input[type=number] {
      width: 10ex;
      text-align: right;
    }
    .error {
      background-color: #ff6666;
    }
  `]
})
export class AppComponent {
  name: string = ''; 
  baseCurrency = 'USD';
  targetCurrency = 'GBP';
  baseAmount = 1;

  constructor(private exchangeService: ExchangeService) { }

 logControl(ctrl : NgModel){
   console.log(ctrl.value)
   console.log(typeof ctrl)
 }
  get targetAmount() {
    
    const exchangeRate = this.exchangeService
      .getExchangeRate(this.baseCurrency, this.targetCurrency);
    return this.baseAmount * exchangeRate;
  }

  isInvalid(value) {
    return !Number.isFinite(value);
  }
}
