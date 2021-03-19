import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ClientAuthService } from '@wise-guy/client-auth';
import { PageConfig } from '@wise-guy/data';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent implements OnInit {
  activePage: PageConfig;
  @Input() pages: PageConfig[]
  constructor(public authService: ClientAuthService) { }

  ngOnInit(): void {
  }
}
