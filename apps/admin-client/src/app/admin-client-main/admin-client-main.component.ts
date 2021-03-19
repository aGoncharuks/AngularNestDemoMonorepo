import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-admin-client-main',
  templateUrl: './admin-client-main.component.html',
  styleUrls: ['./admin-client-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminClientMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
