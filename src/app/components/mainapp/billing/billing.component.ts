import { Component, OnInit, ViewChild } from '@angular/core';
import {
  StripeService,
  Elements,
  Element as StripeElement,
  ElementsOptions, StripeCardComponent, ElementOptions
} from 'ngx-stripe';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: ElementsOptions = {
    locale: 'es'
  };

  constructor(private stripeService: StripeService) {

  }

  ngOnInit() {}

  packageClick($data) {
    console.log($data);
  }

  buy() {
  }
}
