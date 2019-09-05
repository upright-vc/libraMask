# libraMask
LibraMask is a Chrome extension enabling users and developers to interact with the Libra Blockchain through the browser.
This project is lead by Ahmad Sghaier.

Main requirements will include:
- Capability of creating wallets using a mnemonic sentence based on BIP-0039. (Done)
- Capability to import an existing wallet using the mnemonic sentence. (Done)
- Provide a password protected wallet. (Done)
- Storing the wallet info locally in encrypted format (aes256). (Done)
- Capability to export account’s private key. (Done)
- Account balance query. (Done)
- View transaction history. (Done)
- Send and transfer coins. (Done)
- Receive coins by displaying account address as a QR code. (Done)
- Capability to inject in opened website as a js object to access wallet functions for submitting transactions or querying the chain. (Not yet)
- Capability of linking wallet to a single sign-in identity (e.g. Facebook Sign-in). (Not yet)
- Capability to view transactions and accounts on supported Libra Blockchain Explorer(s). (Done)

LibraMask is envisioned as a tool to enable both end users and developers to interact with Libra Blockcian in simple way from within the browser. 
Managing accounts, wallets and all associated crypto keys is a daunting task for users and developers. LibraMask Chrome Extension is meant to enable an easier way for maintaining wallets and accounts information and storing credentials.
An end user will be able to save his account and wallet info in the extension and use the tool to interact and experiment with the Libra Blockchain by creating a new account or importing an existing one. Users can experiment in the current phase using the testnet sending and receiving Libra coins and viewing transactions history.
For developers, the tool should enable developers to build dapps so that the web app can access an injected object and interact through the APIs or SDK with the Libra Blockchain.

## Building the chrome extension

* Install Node.js v12.4.0 or greater.
* Development Environment
    Node: 12.4.0
    Angular CLI: 7.3.8
    Angular: 7.0.4
    Ionic: 4.12.0
* Clone this repository.
* Run `npm install` from the project root.
* This project uses the Kulap-core Libra library https://github.com/kulapio/libra-core v1.0.16
* To overcome current issue in Kulap-core library go to node_modules/kulap-libra/build/client/index.ts and make sure to comment the following line except the line 5

```
    // if (this.config.dataProtocol === 'grpc') {
    //    this.admissionControlProxy = require('./Node');
    // }
    // else {
          this.admissionControlProxy = require('./Browser');
    // }
```

* Run `ng build` from the project root.
* Now in the chrome broswer go to extension and enable developer mode
* Click on upload unpacked extension and point to the www folder under the project
* Hooray now the extension appears in the browser tool bar

