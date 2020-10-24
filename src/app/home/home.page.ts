import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../services/shopping.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'

// import {ShoppingService} from '../services/shopping.service'

import { Item } from '../models/item'
import * as firebase from 'firebase';

interface ItemData {
  Item: string;
  Number: number;
  Price: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  ItemList = [];
  Itemdata: ItemData;
  ItemForm: FormGroup;

  // constructor(
  // private firebaseService: FirebaseService,
  // public fb: FormBuilder
  // ) {
  //   this.ItemData= {} as ItemData;
  // }
  // ngOnit(){

  //   this.ItemForm = this.fb.group({
  //     Item:[""]

  // ){

  // implements OnInit {

  //   //firebaseService: any;
  //   items: Item;
  //   itemForm: FormGroup

  //   itemObj: Item = {
  //     task: '',
  //     priority: 0,
  //     createdAt: 0,
  //   }

  //   itemList = [];

  constructor(
    private shopService: ShoppingService,
    private fb: FormBuilder
  ) {
    this.Itemdata = {} as ItemData;
  }

  ngOnInit() {
    this.ItemForm = this.fb.group({
      item: ['', [Validators.required]],
      number: ['', [Validators.required]],
      price: ['', [Validators.required]]
    })

    this.shopService.read_items().subscribe(data => {

      this.ItemList = data.map(e => {

        console.log(e.payload.doc.id);

        return {
          id: e.payload.doc.id,
          isEdit: false,
          item: e.payload.doc.data()['item'],
          number: e.payload.doc.data()['number'],
          price: e.payload.doc.data()['price'],
        };
      })
      console.log(this.ItemList);

    });
  }


  CreateItem() {
    console.log(this.ItemForm.value);
    this.shopService.create_item(this.ItemForm.value).then(resp => {
      this.ItemForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }

  removeItem(ItemsID) {
    this.shopService.delete_item(ItemsID)

  }

  EditItem(items) {
    items.Edit = true;
    items.EditItem = items.item;
    items.EditNumber = items.number;
    items.EditPrice = items.price;
  }

  UpdateItem(ItemRow) {
    let Items = {};
    Items['Item'] = ItemRow.EditItem;
    Items['number'] = ItemRow.EditNumber;
    Items['Price'] = ItemRow.EditPrice;
    this.shopService.update_item(ItemRow.id, Items);
    ItemRow.isEdit = false;
  }

  deleteItem(){
    console.timeLog()
    firebase.firestore().collection("usershop").doc("3wp4dmlAHCe6nMAfmvi3").delete();
  }
    

}





  /*
      for(let m = 0;m<=this.itemList.length-1;m++){
        if(this.itemList[id]==this.itemList[m]){
           let temp = this.itemList[m];
           this.itemList[temp] = this.itemList[m+1];
           this.itemList[m] = this.itemList[temp];
           -- this.itemList.length
        }
      }*/  
