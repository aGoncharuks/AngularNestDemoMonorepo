import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-landing-shell',
  templateUrl: './landing-shell.component.html',
  styleUrls: ['./landing-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
