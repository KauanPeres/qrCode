import { Component, ChangeDetectorRef } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HistoricoService } from '../services/historico.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})  
export class Tab1Page {
  qrScan: any;
  public corpoPagina: HTMLElement;
  public img: HTMLElement;
  public scanner: any;
  public resultado: string;
  public link = false
  public texto: string;
  public footer: HTMLElement;

  constructor(private qrScanner: QRScanner,
              private dialogs: Dialogs, 
              public platform: Platform, 
              private screenOrientation: ScreenOrientation,
              public historicoSercice: HistoricoService,
              private cdRef: ChangeDetectorRef){ 

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

    this.platform.backButton.subscribeWithPriority(0, ()=>{

      this.corpoPagina.style.opacity = "1";
      this.img.style.opacity = "1";
      this.footer.style.opacity = "1";

      this.resultado = null;
      this.link = false;

      this.qrScanner.hide();      //Desativa a câmera
      this.scanner.unsubscribe(); //Para o scanner
    });
  }

  public lerQRCode(){
    // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted

        this.corpoPagina = document.getElementsByTagName('ion-content')[0] as HTMLElement;
        this.img = document.getElementById("logo") as HTMLElement;
        this.footer = document.getElementById("footer") as HTMLElement;
        
        this.corpoPagina.style.opacity = "0";
        this.img.style.opacity = "0";
        this.footer.style.opacity = "0";

        this.qrScanner.show();
        // start scanning
        this.scanner = this.qrScanner.scan().subscribe((text: string) => {

          this.resultado = (text['result']) ? text['result'] : text;

          this.corpoPagina.style.opacity = "1  ";
          this.img.style.opacity = "1";
          this.footer.style.opacity = "1";

          this.qrScanner.hide(); // hide camera preview
          this.scanner.unsubscribe(); // stop scanning

          this.verificaLink(this.resultado);
          this.cdRef.detectChanges();
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

  public verificaLink(texto: string) {
    const inicio = texto.substring(0, 4);
    console.log(inicio);
    if (inicio == "www." || inicio == "http"){
      this.link = true;
    } else {
      this.link = false;
    }
  }

  ngOnInit() {
  }

}
