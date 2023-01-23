import { ProfileUser } from './../models/user-profile';
import { Soru } from '../models/Soru';
import { Cevap } from '../models/Cevap';
import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, query, setDoc, where } from '@angular/fire/firestore';
import { concatMap, from, map, Observable, of, switchMap, take } from 'rxjs';
import { addDoc, updateDoc } from '@firebase/firestore';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserInfo,
} from '@angular/fire/auth';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  aktifUye = authState(this.auth);
  constructor(
    public fs: Firestore,
    public auth: Auth,
    public storage: Storage
  ) { }

  /*SORULAR KISMI */
  SoruListele() {
    var ref = collection(this.fs, "Sorular");
    return this.aktifUye.pipe(
      concatMap((user) => {
        const myQuery = query(
          ref,
          where('uid', '==', user?.uid)
        );
        return collectionData(myQuery, { idField: 'soruId' }) as Observable<Soru[]>;
      })
    );
  }
  SoruEkle(soru: Soru) {
    var ref = collection(this.fs, "Sorular");
    return this.aktifUye.pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          baslik: soru.baslik,
          soru: soru.soru,
          tamam: soru.tamam,
          uid: user?.uid
        })
      ),
      map((ref) => ref.id)
    );
  }
  SoruDuzenle(soru: Soru) {
    var ref = doc(this.fs, "Sorular/" + soru.soruId);
    return updateDoc(ref, { ...soru });
  }
  SoruSil(soru: Soru) {
    var ref = doc(this.fs, "Sorular/" + soru.soruId);
    return deleteDoc(ref);
  }

  /*CEVAP KISMI */
  CevapListele() {
    var ref = collection(this.fs, "Cevaplar");
    return this.aktifUye.pipe(
      concatMap((user) => {
        const myQuery = query(
          ref,
          where('uid', '==', user?.uid)
        );
        return collectionData(myQuery, { idField: 'cevapId' }) as Observable<Cevap[]>;
      })
    );
  }
  CevapEkle(cevap: Cevap) {
    var ref = collection(this.fs, "Sorular");
    return this.aktifUye.pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          cevap: cevap.cevap,
          soru: cevap.soru,
          uid: user?.uid
        })
      ),
      map((ref) => ref.id)
    );
  }
  CevapDuzenle(cevap: Cevap) {
    var ref = doc(this.fs, "Cevaplar/" + cevap.cevapId);
    return updateDoc(ref, { ...cevap });
  }
  CevapSil(cevap: Cevap) {
    var ref = doc(this.fs, "Cevaplar/" + cevap.cevapId);
    return deleteDoc(ref);
  }

}
