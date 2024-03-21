import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-invoice',
  templateUrl: './contract-invoice.component.html',
  styleUrls: ['./contract-invoice.component.scss']
})
export class ContractInvoiceComponent implements OnInit{

  invoice = [
    {
       itemDesc: "Brown Dress",
       subDesc: "aask - Brown Polyester Blend Women's Fit & Flare Dress.",
       Qty: "3",
       rate: 75,
       subTotal: 225.00  
    },
    {
       itemDesc: "Red Shirt",
       subDesc: "Wild West - Red Cotton Blend Regular Fit Men's Formal Shirt.",
       Qty: "3",
       rate: 60,
       subTotal: 180.00  
    },
    {
       itemDesc: "Flower Dress",
       subDesc: "Skyblue Flower Printed Sleevless Strappy Dress.",
       Qty: "10",
       rate: 22,
       subTotal: 220.00  
    },
    {
       itemDesc: "Red Skirt",
       subDesc: "R L F - Red Cotton Blend Women's A-Line Skirt.",
       Qty: "10",
       rate: 60,
       subTotal: 600.00  
    }
 ]
  ngOnInit() {
  }
}
