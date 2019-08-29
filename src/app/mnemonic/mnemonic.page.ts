import { Component, OnInit } from '@angular/core';
import { WalletService} from '../wallet.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.page.html',
  styleUrls: ['./mnemonic.page.scss'],
})
export class MnemonicPage implements OnInit {
  seedPhrase: any;
  constructor(
    private _wallet: WalletService,
    public navCtrl: NavController
    ) { }

  ngOnInit() {
    this.seedPhrase = this._wallet.wallet.config.mnemonic;
    console.log(this.seedPhrase);
  }

  copy() {
    var el = document.createElement('textarea');
   // Set value (string to be copied)
   el.value = this.seedPhrase;
   // Set non-editable to avoid focus and move outside of view
   el.setAttribute('readonly', '');
   document.body.appendChild(el);
   // Select text inside element
   el.select();
   // Copy text to clipboard
   document.execCommand('copy');
   // Remove temporary element
   document.body.removeChild(el);
    
  }

  proceed() {
    this.navCtrl.navigateRoot('/home');
  }

}
