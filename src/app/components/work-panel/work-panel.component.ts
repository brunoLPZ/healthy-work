import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Settings } from 'src/app/models/settings';
import { Time } from 'src/app/models/time';
import {
  SettingsService,
  YOUTUBE_API_ENABLE,
  YOUTUBE_EMBED_URL,
} from 'src/app/services/settings.service';

@Component({
  selector: 'app-work-panel',
  templateUrl: './work-panel.component.html',
  styleUrls: ['./work-panel.component.scss'],
})
export class WorkPanelComponent {
  @ViewChild('workVideo', { read: ElementRef }) workVideo?: ElementRef;

  workTimerAction: 'start' | 'stop' = 'stop';
  workTime: Time;
  srcVideo: string;

  private userSettings: Settings;

  constructor(private settingsService: SettingsService) {
    this.userSettings = this.settingsService.getSettings();
    this.workTime = { minutes: this.userSettings.workTime, seconds: 0 };
    this.srcVideo = `${YOUTUBE_EMBED_URL}${this.userSettings.youtubeId}${YOUTUBE_API_ENABLE}`;
  }

  @Input() smallTimer: boolean = false;
  @Output() readonly changeMode: EventEmitter<boolean> = new EventEmitter();

  handleTimeEvent(time: Time) {
    if (time.minutes === 0 && time.seconds === 0) {
      this.workTimerAction = 'stop';
      this.workTime = { minutes: this.userSettings.workTime, seconds: 0 };
      this.changeMode.emit(true);
    } else {
      this.workTime = time;
    }
  }

  toggleTimer() {
    this.workTimerAction = this.workTimerAction === 'stop' ? 'start' : 'stop';
    this.videoAction(
      this.workTimerAction === 'start' ? 'playVideo' : 'pauseVideo'
    );
  }

  nextMode() {
    this.workTimerAction = 'stop';
    this.workTime = { minutes: this.userSettings.workTime, seconds: 0 };
    this.changeMode.emit(false);
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
