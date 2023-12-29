import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private localStorage : any;
  private platform: any;

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: Object) { 
    this.localStorage = document.defaultView?.localStorage;
    this.platform = platformId;
  }

  public saveData(key:string, value:string){
    if(isPlatformBrowser(this.platformId)){
      this.localStorage?.setItem(key,value);
    }
  }

  public getData(key:string){
    if(isPlatformBrowser(this.platformId)){
    return this.localStorage?.getItem(key);
    }
  }

  public removeData(key:string){
    if(isPlatformBrowser(this.platformId)){
    this.localStorage.removeItem(key);
    }
  }
  public clearData() {
    if(isPlatformBrowser(this.platformId)){
    this.localStorage.clear();
    }
  }


}
