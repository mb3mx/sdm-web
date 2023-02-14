import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignedComponent } from './assigned/assigned.component';
import { NewComponent } from './new/new.component';
import { TicketComponent } from './ticket.component'; 

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: TicketComponent,
      },
      {
        path: 'assigned',
        component: AssignedComponent,
      },
      {
        path: 'new',
        component: NewComponent  ,
      } 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketRoutingModule {}
