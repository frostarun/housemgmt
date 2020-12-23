import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptutilService {
  encryptSecretKey = '1234567890';

  constructor() { }

  encryptData(data: string) {
    return CryptoJS.AES.encrypt(data, this.encryptSecretKey).toString();
  }

}
