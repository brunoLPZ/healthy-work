import { Component, ElementRef, ViewChild } from '@angular/core';
import { Settings } from 'src/app/models/settings';
import { Time } from 'src/app/models/time';
import {
  SettingsService,
  YOUTUBE_API_ENABLE,
  YOUTUBE_EMBED_URL,
} from 'src/app/services/settings.service';

@Component({
  selector: 'app-work-page',
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.scss'],
})
export class WorkPageComponent {
  mode: 'work' | 'break' = 'work';
  workTimerAction: 'start' | 'stop' = 'stop';
  workTime: Time;

  breakTimerAction: 'start' | 'stop' = 'stop';
  breakTime: Time;

  srcVideo: string;

  @ViewChild('workVideo', { read: ElementRef }) workVideo?: ElementRef;

  private userSettings: Settings;

  constructor(private settingsService: SettingsService) {
    this.userSettings = this.settingsService.getSettings();
    this.workTime = { minutes: this.userSettings.workTime, seconds: 0 };
    this.breakTime = { minutes: this.userSettings.breakTime, seconds: 0 };
    this.srcVideo = `${YOUTUBE_EMBED_URL}${this.userSettings.youtubeId}${YOUTUBE_API_ENABLE}`;
  }

  toggleTimer() {
    if (this.mode === 'work') {
      this.workTimerAction = this.workTimerAction === 'stop' ? 'start' : 'stop';
      this.videoAction(
        this.workTimerAction === 'start' ? 'playVideo' : 'pauseVideo'
      );
    } else {
      this.breakTimerAction =
        this.breakTimerAction === 'stop' ? 'start' : 'stop';
    }
  }

  nextMode() {
    if (this.mode === 'work') {
      this.workTimerAction = 'stop';
      this.mode = 'break';
      this.workTime = { minutes: this.userSettings.workTime, seconds: 0 };
    } else {
      this.breakTimerAction = 'stop';
      this.mode = 'work';
      this.breakTime = { minutes: this.userSettings.breakTime, seconds: 0 };
    }
  }

  handleTimeEvent(time: Time) {
    if (this.mode === 'work') {
      if (time.minutes === 0 && time.seconds === 0) {
        this.workTimerAction = 'stop';
        this.mode = 'break';
        this.workTime = { minutes: this.userSettings.workTime, seconds: 0 };
      } else {
        this.workTime = time;
      }
    } else {
      if (time.minutes === 0 && time.seconds === 0) {
        this.breakTimerAction = 'stop';
        this.mode = 'work';
        this.breakTime = { minutes: this.userSettings.breakTime, seconds: 0 };
      } else {
        this.breakTime = time;
      }
    }
  }

  private videoAction(action: 'playVideo' | 'pauseVideo') {
    if (this.workVideo) {
      this.workVideo.nativeElement.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: action,
          args: [],
        }),
        '*'
      );
    }
  }
}
