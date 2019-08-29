# libraMask
LibraMask is a Chrome extension enabling users and developers to interact with the Libra Blockchain through the browser.
This project is lead by Ahmad Sghaier.

Main requirements will include:
- Capability of creating wallets using a mnemonic sentence based on BIP-0039.
- Capability to import an existing account using either the mnemonic sentence or private key.
- Provide a password protected wallet.
- Storing the wallet info locally in encrypted format (aes256).
- Capability to export account’s private key.
- Account balance query.
- View transaction history.
- Send and transfer coins.
- Receive coins by displaying account address as a QR code.
- Capability to inject in opened website as a js object to access wallet functions for submitting transactions or querying the chain.
- Capability of linking wallet to a single sign-in identity (e.g. Facebook Sign-in).
- Capability to view transactions and accounts on supported Libra Blockchain Explorer(s).

LibraMask is envisioned as a tool to enable both end users and developers to interact with Libra Blockcian in simple way from within the browser. 
Managing accounts, wallets and all associated crypto keys is a daunting task for users and developers. LibraMask Chrome Extension is meant to enable an easier way for maintaining wallets and accounts information and storing credentials.
An end user will be able to save his account and wallet info in the extension and use the tool to interact and experiment with the Libra Blockchain by creating a new account or importing an existing one. Users can experiment in the current phase using the testnet sending and receiving Libra coins and viewing transactions history.
For developers, the tool should enable developers to build dapps so that the web app can access an injected object and interact through the APIs or SDK with the Libra Blockchain.

## Getting Started

* Install Node.js v12.4.0 or greater.
* Install the ionic CLI globally: `npm install -g ionic`
* Clone this repository.
* Run `npm install` from the project root.
* This project uses the Kulap-core Libra library https://github.com/kulapio/libra-core v1.0.16
* Go to node_modules/kulap-libra/build/client/index.ts and make sure to comment the following line except the line 5
```
    // if (this.config.dataProtocol === 'grpc') {
    //    this.admissionControlProxy = require('./Node');
    // }
    // else {
          this.admissionControlProxy = require('./Browser');
    // }
```
* Run `ionic serve --l` in a terminal from the project root.

## Building the chrome extension

* Run `ng build` from the project root.
* Under the created www folder create a new file (manifest.json)
* copy the following text in the manifest.json file and save it
```
    {
      "name": "LibraMask Chrome Extension",
      "version": "0.1",
      "description": "LibraMask a Chrome Extension to connect to Libra Blockchain!",
      "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
      "browser_action": {
      "default_popup": "index.html",
      "default_icon": "assets/imgs/libra.png"
    },
      "manifest_version": 2
    }
```
* Go to the index.html file under the www folder comment the upper section of the file and uncomment the lower section and save the file
* Now in the chrome broswer go to extension and enable developer mode
* Click on upload unpacked extension and point to the www folder under the project
* Hooray now the extension appears in the browser tool bar

