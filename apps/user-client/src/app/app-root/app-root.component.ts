import { Component, Inject } from '@angular/core';
import { PageConfig, CLIENT_CONFIG, AppConfig } from '@wise-guy/data';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],
})
export class AppRootComponent {

  constructor(@Inject (CLIENT_CONFIG) private config: AppConfig) {
  }

  pages: PageConfig[] = this.config.pages;
}
