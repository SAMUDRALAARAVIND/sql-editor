import { Injectable } from '@angular/core';
import { HttpHeaders , HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private httpOptions = {};
  constructor(private httpClient: HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }

   }

   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      return throwError(`${error.error.warning}`);
    }
    return throwError("Something bad happened");
  }
  executeQuery(query){
    return this.httpClient
    .get(`https://sql-checker.herokuapp.com/query?query=${query}`, this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  getTables(){
    
    return this.httpClient
    .get("https://sql-checker.herokuapp.com/tables", this.httpOptions)
    .pipe(catchError(this.handleError));
  }


}

