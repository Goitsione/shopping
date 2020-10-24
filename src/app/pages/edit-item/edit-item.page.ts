import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { firestore } from 'firebase';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {

  itemForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.itemForm = this.fb.group({
      item: ['', [Validators.required]],
      number: ['', [Validators.required]],
      price: ['', [Validators.required]]
    })

  }

}
