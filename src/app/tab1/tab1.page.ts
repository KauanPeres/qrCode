import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})  
export class Tab1Page {
  qrScan: any;
  constructor(private qrScanner: QRScanner,private dialogs: Dialogs){ }

  public lerQRCode(){
    // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted

        this.qrScanner.show();

        const corpo = document.getElementsByTagName('body')[0] as HTMLElement;
        corpo.style.opacity = "0";

        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);

          this.dialogs.alert('Resultado: ' + text);

          corpo.style.opacity = "1  ";

          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
        });

      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e)); 
  }

  ngOnInit() {
  }

}
