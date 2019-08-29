import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { WalletService} from '../wallet.service';


@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage implements OnInit {
  seedPhrase: any;
  password: any;
  //wallet = new LibraWallet();

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              private _wallet: WalletService) { }

  ngOnInit() {
    
  }

  import() {
    this.importWallet();
  }

  async importWallet() {
    await this._wallet.importWallet(this.seedPhrase, this.password);
    this.navCtrl.navigateRoot('/home');
  }

  later() {
    this.navCtrl.goBack();
  }

}
