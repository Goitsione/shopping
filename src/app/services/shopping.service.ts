import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {


  db = 'usershop';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_item(item) {
    return this.firestore.collection(this.db).add(item);
  }

  read_items() {
    return this.firestore.collection(this.db).snapshotChanges();
  }

  update_item(itemID, items) {
    this.firestore.doc(this.db + '/' + itemID).update(items);
  }

  delete_item(itemID) {
    this.firestore.doc(this.db + '/' + itemID).delete();
  }

}