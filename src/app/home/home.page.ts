import { Component, OnInit } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';
import { AnyARecord } from 'dns';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  qrScan: any;
  constructor(public platform: Platform, public dialog: Dialogs, public qr: QRScanner) 
  {
    //Now disable scanning when back button is pressed
    this.platform.backButton.subscribeWithPriority(0,()=>{
      document.getElementsByTagName("body")[0].style.opacity = "1";
      this.qrScan.unsubsribe();
    })
  }

  StartScanning()
  {
    this.qr.prepare().then((status:QRScannerStatus)=>{
      if(status.authorized) 
      {
        this.qr.show();
        document.getElementsByTagName("body")[0].style.opacity = "0";
      this.qrScan = this.qr.scan().subscribe((textFound)=>{
        document.getElementsByTagName("body")[0].style.opacity = "1";
        this.qrScan.unsubsribe();
        this.dialog.alert(textFound);

        },(err)=>{
          this.dialog.alert(JSON.stringify(err));
        })
      }
      else if(status.denied)
      {

      }
      else{

      }
    })
  }

  ngOnInit() {
  }

}
