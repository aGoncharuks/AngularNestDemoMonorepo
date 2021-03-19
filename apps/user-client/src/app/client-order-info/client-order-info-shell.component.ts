import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@wise-guy/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-client-order-info-shell',
  templateUrl: './client-order-info-shell.component.html',
  styleUrls: ['./client-order-info-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientOrderInfoShellComponent implements OnInit {
  order$: Observable<Order>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.order$ = this.route.data.pipe(
      map(data => data?.order)
    )
  }

}
