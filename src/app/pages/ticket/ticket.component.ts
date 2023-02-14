import { Component, OnInit } from '@angular/core';
import { Ticket } from '@app/core/models/tickets/ticket.model';
import { TicketService } from '@app/core/services/modules/ticket/ticket.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  _ticketsObsevable$ : BehaviorSubject<any> = new BehaviorSubject([]);
  filterSearch: any;
  maxSize = 2;
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [1, 2, 3];

  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    return this.ticketService.findAllTickets().subscribe((response: Ticket) => {
      this.count = response.records.lenght;
      this._ticketsObsevable$.next(response.records)
    });
  }


  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.loadTickets();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.loadTickets();
  }

}
