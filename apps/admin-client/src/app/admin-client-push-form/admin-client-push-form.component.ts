import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-admin-client-push-form',
  templateUrl: './admin-client-push-form.component.html',
  styleUrls: ['./admin-client-push-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminClientPushFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
