import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { LibraNetwork } from 'kulap-libra';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  account: any ={};
  keys: any = {};
  pubkey: any;
  seckey: any;
  network: any = {};
  currentAccount: any = {};

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { 
    this.network = LibraNetwork.Testnet;
  }

  hasWallet() {
    return this.storage.get('isWalletExist');
  }

  hasAWallet() {
    this.storage.set('isWalletExist', true);
  }

  setSeedPhrase(phrase) {
    this.storage.set('libraseed', phrase);
  }

  
  getSeedPhrase() {
    return this.storage.get('libraseed');
  }

}
