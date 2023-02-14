import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@environment/environment';
import { Ticket } from '@models/tickets/ticket.model';



@Injectable({
  providedIn: 'root'
})
export class TicketService {

  readonly API_URL = environment.sdmTelemetryAPI;

  constructor(private http: HttpClient) { }

  findAllTickets(): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.API_URL}v1.0/tickets`).pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
