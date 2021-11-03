import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
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
    private tutorialService: TutorialService,
    private dialog: MatDialog
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.urlAfterRedirects.replace('/', '');
      }
    });
  }

  goToHome(): void {
    const navigation = ['/'];
    if (this.currentRoute !== 'work') {
      this.router.navigate(navigation);
    } else {
      this.openConfirmDialog(navigation);
    }
  }

  goToSettings(): void {
    const navigation = ['/', 'settings'];
    if (this.currentRoute !== 'work') {
      this.router.navigate(navigation);
    } else {
      this.openConfirmDialog(navigation);
    }
  }

  onStartTutorial(): void {
    if (this.currentRoute) {
      this.tutorialService.startTutorial(this.currentRoute);
    }
  }

  private openConfirmDialog(navigation: string[]): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '30rem',
      autoFocus: false,
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(navigation);
      }
    });
  }
}
