import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Settings } from 'src/app/models/settings';
import { Task } from 'src/app/models/task';
import { Time } from 'src/app/models/time';
import {
  SettingsService,
  YOUTUBE_API_ENABLE,
  YOUTUBE_EMBED_URL,
} from 'src/app/services/settings.service';
import { TasksService } from 'src/app/services/task.service';

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
  videoMuted: boolean = false;
  videoPaused: boolean = true;
  videoMaximized: boolean = false;

  private userSettings: Settings;

  constructor(
    private settingsService: SettingsService,
    private taskService: TasksService
  ) {
    this.userSettings = this.settingsService.getSettings();
    this.workTime = { minutes: this.userSettings.workTime, seconds: 0 };
    this.srcVideo = `${YOUTUBE_EMBED_URL}${this.userSettings.youtubeId}${YOUTUBE_API_ENABLE}`;
  }

  @Input() smallTimer: boolean = false;
  @Input() activeTask?: Task;

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

  toggleTimer(): void {
    this.workTimerAction = this.workTimerAction === 'stop' ? 'start' : 'stop';
    this.videoAction(
      this.workTimerAction === 'start' ? 'playVideo' : 'pauseVideo'
    );
  }

  toggleMute(): void {
    this.videoMuted = !this.videoMuted;
    this.videoAction('setVolume', [this.videoMuted ? 0 : 100]);
  }

  nextMode(): void {
    this.workTimerAction = 'stop';
    this.workTime = { minutes: this.userSettings.workTime, seconds: 0 };
    this.changeMode.emit(false);
  }

  getStatusIcon(): string | undefined {
    if (this.activeTask) {
      return this.taskService.getStatusIcon(this.activeTask);
    }
    return;
  }

  togglePlay(): void {
    this.videoPaused = !this.videoPaused;
    this.videoAction(this.videoPaused ? 'pauseVideo' : 'playVideo');
  }

  toggleMaximize(): void {
    this.videoMaximized = !this.videoMaximized;
  }

  private videoAction(
    action: 'playVideo' | 'pauseVideo' | 'setVolume',
    args?: any[]
  ): void {
    if (this.workVideo) {
      this.workVideo.nativeElement.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: action,
          args: args || [],
        }),
        '*'
      );
    }
  }
}
