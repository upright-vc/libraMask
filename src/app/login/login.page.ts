import { NavController ,MenuController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WalletService} from '../wallet.service';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';

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
    private _wallet: WalletService,
    private _socioAuthServ: AuthService
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

  public socialSignIn(socialPlatform : string) {
    // let socialPlatformProvider;
    // if(socialPlatform == "facebook"){
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // }
    let platform = FacebookLoginProvider.PROVIDER_ID;
    this._socioAuthServ.signIn(platform).then(
      (response) => {
        console.log(platform + " logged in user data is= ", response);
        // this.user = response;
      }
    );
    
    // this.socialAuthService.signIn(socialPlatformProvider).then(
    //   (userData) => {
    //     console.log(socialPlatform+" sign in data : " , userData);
    //     // Now sign-in with userData
    //     // ...
            
    //   }
    // );
  }

}
