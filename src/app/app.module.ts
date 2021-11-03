import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TimerComponent } from './components/timer/timer.component';
import { WorkPageComponent } from './pages/work-page/work-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SafePipe } from './pipes/safe.pipe';
import { WorkPanelComponent } from './components/work-panel/work-panel.component';
import { BreakPanelComponent } from './components/break-panel/break-panel.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TimerComponent,
    WorkPageComponent,
    SettingsPageComponent,
    SafePipe,
    WorkPanelComponent,
    BreakPanelComponent,
    TaskListComponent,
    TaskDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
