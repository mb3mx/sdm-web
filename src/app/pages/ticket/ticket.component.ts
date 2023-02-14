import { Component, OnInit } from '@angular/core';
import { TicketService } from '@app/core/services/modules/ticket/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
   filterSearch: any;
  tickets: any = [];
  maxSize = 2;
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [1, 2, 3];

  constructor(private ticketService: TicketService) {
    this.loadTickets();

  }

  ngOnInit(): void {
    
  }

  loadTickets() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    return this.ticketService.findAllTickets().subscribe((response: any) => {
      this.tickets = response.records;
      this.count = response.records.lenght;

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
