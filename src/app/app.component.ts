import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TutorialService } from './services/tutorial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentRoute?: string;

  constructor(
    private router: Router,
    private tutorialService: TutorialService
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.urlAfterRedirects.replace('/', '');
      }
    });
  }

  onStartTutorial() {
    if (this.currentRoute) {
      this.tutorialService.startTutorial(this.currentRoute);
    }
  }
}
