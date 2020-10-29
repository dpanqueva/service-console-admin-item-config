import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { BANKWALLET } from 'src/app/model/bank-parameters-pk.json';
import { BankWallet } from 'src/app/model/bank-wallet';


@Injectable({
  providedIn: 'root'
})
export class BankWalletService {

  constructor() { }

  getWalletBank():Observable<BankWallet[]>{
    return of(BANKWALLET);
  }


}
