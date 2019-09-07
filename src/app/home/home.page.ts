import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { WalletService} from '../wallet.service';
import { LibraClient, LibraNetwork } from 'kulap-libra';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  trunc_pubkey: any;
  response: any = {};  
  send: any = {};
  balance: any;
  aciveAccount: any = {};
  address: any;
  toAddress: any;
  amount: any;
  truncAddress: any;
  txs: any = {};
  
  constructor(public navCtrl: NavController, private loading: LoadingController,
              private alrtCtrl: AlertController,private _wallet: WalletService) {

    }

    ngOnInit() {
      this.aciveAccount = this._wallet.activeAccount;
      this.address = this.aciveAccount.getAddress().toString();
      this.truncAddress = this.address.substring(0, 4) + '...' + this.address.substring(60)
      this.getBalance();
      this.getHistory();
    }

    receive() {
      this.navCtrl.navigateForward('/receive')
    }

    transfer() {
      this.navCtrl.navigateForward('/transfer')
    }

    async addToken() {
      let confirm = await this.alrtCtrl.create({
        header: 'Mint Libra Token',
        message: 'Enter amount of Libra Coin to mint and receive in your account',
        inputs: [
          {
            name: 'amount',
            placeholder: 'Amount of Libra Coins'
          }
        ],
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
             
          }
        }, {
          text: 'Confirm',
          handler: data => {
            this.mint(data.amount);
          }
        }]
      });
      confirm.present();
    }

    mint(amount){
      this._wallet.mint(amount)
      .then( res => {
        this.ngOnInit();
      }, (err) => {
        alert("Minting operation failed");
      });
    }

    getHistory() {
      this._wallet.getHistory()
      .then(res => {
        this.response = res;
        this.txs = this.response.result;
        console.log(this.txs);
      }, (err) => {
        if(err.status == 401 || err.status == 404 || err.status == 500)
          alert(err.message);
        else
          alert("Error loading Account History");
      });
    }

    async getBalance() {
      const accountState = await this._wallet.client.getAccountState(this.address);
      this.balance = accountState.balance / 1e6;
    }

    refresh() {
      this.getBalance();
      this.getHistory();
    }

    explore(type,id){
      window.open('https://librabrowser.io/'+type+'/'+id, "_blank");
    }

}
