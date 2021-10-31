import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Settings } from 'src/app/models/settings';
import { Time } from 'src/app/models/time';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-break-panel',
  templateUrl: './break-panel.component.html',
  styleUrls: ['./break-panel.component.scss'],
})
export class BreakPanelComponent {
  breakTimerAction: 'start' | 'stop' = 'stop';
  breakTime: Time;

  userSettings: Settings;

  @Input() smallTimer: boolean = false;
  @Output() readonly changeMode: EventEmitter<boolean> = new EventEmitter();

  constructor(private settingsService: SettingsService) {
    this.userSettings = this.settingsService.getSettings();
    this.breakTime = { minutes: this.userSettings.breakTime, seconds: 0 };
  }

  handleTimeEvent(time: Time) {
    if (time.minutes === 0 && time.seconds === 0) {
      this.breakTimerAction = 'stop';
      this.breakTime = { minutes: this.userSettings.breakTime, seconds: 0 };
      this.changeMode.emit(true);
    } else {
      this.breakTime = time;
    }
  }

  toggleTimer() {
    this.breakTimerAction = this.breakTimerAction === 'stop' ? 'start' : 'stop';
  }

  nextMode() {
    this.breakTimerAction = 'stop';
    this.breakTime = { minutes: this.userSettings.breakTime, seconds: 0 };
    this.changeMode.emit(false);
  }
}
