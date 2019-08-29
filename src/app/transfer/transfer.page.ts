import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { WalletService} from '../wallet.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  toAddress: any;
  amount: any;
  
  constructor(private loading: LoadingController,
              private alrtCtrl: AlertController,
              private _wallet: WalletService) { }

  ngOnInit() {
  }

  async sendFunds() {
    let confirm = await this.alrtCtrl.create({
      header: 'Send Funds?',
      message: "This will transfer the amount specified to the selected account ?",
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
           
        }
      }, {
        text: 'Confirm',
        handler: () => {
          this.presentLoader();
        }
      }]
    });
    confirm.present();
  }

  async presentLoader() {
    let loader = await this.loading.create({
      message: 'Please wait..',
      spinner: 'bubbles'
    });

    loader.present().then(() => {
        this._wallet.sendFunds(this.toAddress, this.amount);
        loader.dismiss();
    });
  }

}
