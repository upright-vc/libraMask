import { NavController ,MenuController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WalletService} from '../wallet.service';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  password: any;
  constructor(
    private menuCtrl: MenuController, 
    private navCtrl: NavController,
    private _wallet: WalletService
  ) { 
    this.password = '';
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  doLogin() {
    this.getAccount();
    //this.navCtrl.navigateRoot('/home');
  }

  ngOnDestroy() {
    this.menuCtrl.enable(true);
  }

  generateKey(p){
    var salt = "E1F53135E559C253";
    return CryptoJS.PBKDF2(p, salt, { keySize: 512/32, iterations: 1000 });
  }

  async getAccount() {
    await this._wallet.obtainWallet(this.password);
    this.navCtrl.navigateRoot('/home');      
  }

  import() {
    this.navCtrl.navigateForward('/import');
  }

}
