import { Component, OnInit } from '@angular/core';
import { WalletService} from '../wallet.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {
  showSecKey = false;
  showNoshowText = 'SHOW';
  showNoshow = ['SHOW','HIDE'];
  secKey: string = '';
  constructor(private _wallet: WalletService, public alertController: AlertController) { }
  address: any;
  ngOnInit() {
    this.address = this._wallet.activeAccount.getAddress();
    this.secKey = this._wallet.exportSecKey();
  }

  async displaySecKey() {
    this.showSecKey = ! this.showSecKey;
    this.showNoshowText = this.showNoshow[Number(this.showSecKey)];
  }

  // copyAddress() {
  //     /* Get the text field */
  //     var copyText = document.getElementById("addressText") as HTMLInputElement;
  //     console.log(copyText);
  //     /* Select the text field */
  //     copyText.select();
  //     //copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  //     /* Copy the text inside the text field */
  //     document.execCommand("copy");
  // }

}
