import { Injectable } from '@angular/core';
import { SettingsService} from './settings.service';
import { LibraWallet, Account as LibraAccount, LibraClient } from 'kulap-libra';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  wallet: any = {};
  activeAccount: any = {};
  client = new LibraClient({
    transferProtocol: 'https',
    host: 'ac-libra-testnet.kulap.io',
    port: '443',
    dataProtocol: 'grpc-web-text'
  });

  constructor(private _settings: SettingsService, private _http: HttpClient) { 

  }

  public async createWallet(password: string){
    try {
      this.wallet = new LibraWallet();
      // // generate a new account
      const account = this.wallet.newAccount();
      this.activeAccount = account;
      // // you can see your address by:
      var buff = Buffer.from(account.keyPair.getSecretKey())
      this.storeWallet(password, this.wallet.config.mnemonic);
    } catch(err) {
      throw new Error(err);
    }
  }

  public async obtainWallet(password: string){
    try {
      // retreive seed phrase from local storage
      let seedPhrase = this.getWallet(password);
      // generate the wallet using the stored seed phrase
      this.wallet = new LibraWallet({mnemonic: seedPhrase});

      // // retrieve the first account and make it the active account
      this.activeAccount = this.wallet.generateAccount(0);
    } catch(err) {
      throw new Error(err);
    }
  }

  getHistory() {
    //var headers = new HttpHeaders().set('Authorization','Basic d2ViYXBwOkNuM01vOUhnMFB1NVVyOA==');
    return new Promise((resolve, reject) => {
      this._http.get('https://api-test.libexplorer.com/api?module=account&action=txlist&address='+this.activeAccount.getAddress()).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  public async sendFunds(toAddress: string, amount: number) {
    const response = await this.client.transferCoins(this.activeAccount, toAddress, 1e6);
    return await response.awaitConfirmation(this.client);
  }

  public async getTransactionDetails(txId) {
    return await this.client.getAccountTransaction(this.activeAccount.getAddress(), txId, true);
  }

  public async importWallet(mnemonic: string, password: string){
    try {
      // generate the wallet using the stored seed phrase
      this.wallet = new LibraWallet({mnemonic: mnemonic});

      // // retrieve the first account and make it the active account
      this.activeAccount = this.wallet.generateAccount(0);
      this.storeWallet(password, mnemonic);
    } catch(err) {
      throw new Error(err);
    }
  }

  private generateKey(p){
    var salt = "E1F53135E559C253";
    return CryptoJS.PBKDF2(p, salt, { keySize: 512/32, iterations: 1000 });
  }

  public exportSecKey() {
    let secKey = Buffer.from(this.activeAccount.keyPair.getSecretKey());
    return secKey.toString('hex');
  }

  private storeWallet(password, phrase) {
    let skey = this.generateKey(password);
    var encPhrase = CryptoJS.AES.encrypt(phrase, skey.toString());
    this._settings.setSeedPhrase(encPhrase.toString());
    this._settings.hasAWallet();
  }

  private getWallet(password: string) {
    let skey = this.generateKey(password);
    var encPhrase = this._settings.getSeedPhrase();
    var bytes  = CryptoJS.AES.decrypt(encPhrase, skey.toString());
    var phrase = bytes.toString(CryptoJS.enc.Utf8);
    return phrase;
  }

}
