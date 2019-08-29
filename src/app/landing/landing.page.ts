import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { WalletService} from '../wallet.service';
// import * as CryptoJS from 'crypto-js';

// import { LibraWallet, Account as LibraAccount } from 'kulap-libra';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  password: any;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              private _wallet: WalletService) { }

  ngOnInit() {
  }

  newWallet() {
    this.createWallet();
  }

  async createWallet() {
    try {
      // // generate a new wallet
      await this._wallet.createWallet(this.password);
      this.navCtrl.navigateRoot('/mnemonic');
    } catch(err) {
      alert('Failed to create a new wallet');
    }
  }

  import() {
    this.navCtrl.navigateForward('/import');
  }
  

}
