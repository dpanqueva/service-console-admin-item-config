import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BankParameters } from 'src/app/model/bank-parameters';
import { BankParametersPK } from 'src/app/model/bank-parameters-pk';


@Injectable({
  providedIn: 'root'
})
export class GenericServiceService {

  apiBaseURL = environment.BASE_URL;

  constructor(private http: HttpClient) { }


  getAllParameters():Observable<any>{
    return this.http.get(this.apiBaseURL + 'parameters/parameters/').pipe(
      tap((response: any) => {
        console.log('Parameters tap 1');
        (response as BankParameters[]).forEach(
          bankP => {
            //console.log(bankP.bankParametersPK.handle);
          }
        )
      }),
      map((response: any) => {
        (response as BankParameters[]).map(bankP => {
          //bankP.bankParametersPK.paramName = bankP.bankParametersPK.paramName.toUpperCase();
          return bankP;
        });
        return response;
      }),
      tap(response => {
        //console.log('Parameters tap 2');
        (response as BankParameters[]).forEach(bankP => {
          //console.log(bankP.bankParametersPK.paramName);
        })
      })
    );
  }

  /**
   * Method for obtain number page and information about this parameter in this page
   * @param page 
   */
  getParameters(page: number): Observable<any> {
    return this.http.get(this.apiBaseURL + 'parameters/page/' + page).pipe(
      tap((response: any) => {
        //console.log('Parameters tap 1');
        (response.content as BankParameters[]).forEach(
          bankP => {
            //console.log(bankP.bankParametersPK.handle);
          }
        )
      }),
      map((response: any) => {
        (response.content as BankParameters[]).map(bankP => {
          bankP.bankParametersPK.paramName = bankP.bankParametersPK.paramName.toUpperCase();
          return bankP;
        });
        return response;
      }),
      tap(response => {
        //console.log('Parameters tap 2');
        (response.content as BankParameters[]).forEach(bankP => {
          //console.log(bankP.bankParametersPK.paramName);
        })
      })
    );
  }
  /**
   * Methos for create a new bank parameter
   * @param bankParameters 
   */
  create(bankParameters: BankParameters): Observable<any> {
    var urlcorta = this.apiBaseURL + 'parameters/parameters/';
    return this.http.post<any>(urlcorta, bankParameters).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * Method for get and find a bank parameter finding for handle and paramname
   * @param bankParameters 
   */
  getParameter(bankParameters: BankParametersPK): Observable<BankParameters> {
    return this.http.get<BankParameters>(`${this.apiBaseURL}parameters/parameters//${bankParameters.handle}/${bankParameters.paramName}`)
      .pipe(catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
      );
  }

  /**
   * Methos for update a bank parameter
   * @param bankParameters 
   */
  update(bankParameters: BankParameters): Observable<any> {
    debugger;
    var urlcorta = `${this.apiBaseURL}parameters/parameters/${bankParameters.bankParametersPK.handle}/${bankParameters.bankParametersPK.paramName}`;
    console.log(urlcorta);
    return this.http.put<any>(urlcorta, bankParameters)
      .pipe(catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
      );
  }

  delete(bankParametersDelete: BankParameters): Observable<BankParameters> {
    var urlcorta = `${this.apiBaseURL}parameters/parameters/${bankParametersDelete.bankParametersPK.handle}/${bankParametersDelete.bankParametersPK.paramName}`;
    console.log(bankParametersDelete);
    console.log(urlcorta);
    return this.http.delete<BankParameters>(urlcorta).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  getAllItems():Observable<any>{
    return this.http.get(this.apiBaseURL + 'items/parameters').pipe(
      tap((response: any) => {
        console.log('Parameters tap 1');
        (response as BankParameters[]).forEach(
          bankP => {
           // console.log(bankP.isEncrypt);
          }
        )
      }),
      map((response: any) => {
        (response as BankParameters[]).map(bankP => {
          //bankP.bankParametersPK.paramName = bankP.bankParametersPK.paramName.toUpperCase();
          //console.log(bankP);
          return bankP;
        });
        return response;
      }),
      tap(response => {
        //console.log('Parameters tap 2');
        (response as BankParameters[]).forEach(bankP => {
          //console.log(bankP.bankParametersPK.paramName);
        })
      })
    );
  }
}
