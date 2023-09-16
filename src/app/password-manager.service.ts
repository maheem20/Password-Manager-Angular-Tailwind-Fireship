import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore: Firestore) { }

  addSite(data: object) {
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data);
  }

  loadSites() {
    const dbInstance = collection(this.firestore, 'sites');
    return collectionData(dbInstance, { idField: 'id' });
  }

  updateSite(data: object, id: string) {
    const dbInstance = doc(this.firestore, 'sites', id);
    return updateDoc(dbInstance, data);
  }

  deleteSite(id: string) {
    const dbInstance = doc(this.firestore, 'sites', id);
    return deleteDoc(dbInstance);
  }

  // password queries
  addPassword(data: object, siteId: string) {
    const dbInstance = collection(this.firestore, `site/${siteId}passwords`);
    return addDoc(dbInstance, data);
  }

  loadPasswords(siteId: string) {
    const dbInstance = collection(this.firestore, `site/${siteId}passwords`);
  }
}
