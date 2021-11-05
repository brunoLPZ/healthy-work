import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task';
import { SessionService } from 'src/app/services/session.service';
import { TasksService } from 'src/app/services/task.service';

@Component({
  selector: 'app-work-page',
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.scss'],
})
export class WorkPageComponent {
  mode: 'work' | 'break' = 'work';

  lastScrollTop = 0;
  completedSessions = 0;
  isSmallTimer: boolean = false;
  showClock: boolean = false;
  sessionRestartFlip: boolean = false;

  @ViewChild('taskEnd', { read: ElementRef }) taskEnd?: ElementRef;
  @ViewChild('alarm', { read: ElementRef }) alarm?: ElementRef;

  taskList: Task[];
  activeTask?: Task;

  constructor(
    private taskService: TasksService,
    private sessionService: SessionService
  ) {
    this.taskList = this.taskService.getTasks();
    this.activeTask = this.taskService.getActiveTask();
    this.completedSessions = this.sessionService.getSessionNumber();
  }

  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView() {
    if (this.taskEnd) {
      const rect = this.taskEnd.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom - 300 <= window.innerHeight;
      this.isSmallTimer = topShown && bottomShown;
    }
  }

  onActiveTask(task: Task): void {
    this.activeTask = task;
  }

  nextMode(playAlarm: boolean) {
    this.mode = this.mode === 'work' ? 'break' : 'work';
    if (playAlarm) {
      if (this.mode === 'break') {
        this.completedSessions += 1;
        this.sessionService.storeSession({ sessions: this.completedSessions });
      }
      this.showClock = true;
      setTimeout(() => (this.showClock = false), 4000);
      this.playAlarm();
    }
  }

  playAlarm(): void {
    if (this.alarm) {
      this.alarm.nativeElement.play();
    }
  }

  restartSessions() {
    this.sessionService.storeSession({ sessions: 0 });
    this.completedSessions = 0;
  }
}
