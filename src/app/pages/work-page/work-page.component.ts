import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task';
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

  @ViewChild('tasks', { read: ElementRef }) tasks?: ElementRef;
  @ViewChild('alarm', { read: ElementRef }) alarm?: ElementRef;

  taskList: Task[];
  activeTask?: Task;

  constructor(taskService: TasksService) {
    this.taskList = taskService.getTasks();
    this.activeTask = taskService.getActiveTask();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > 560) {
      this.isSmallTimer = true;
    } else if (st < this.lastScrollTop) {
      this.isSmallTimer = false;
    }
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  onActiveTask(task: Task): void {
    this.activeTask = task;
  }

  nextMode(playAlarm: boolean) {
    this.mode = this.mode === 'work' ? 'break' : 'work';
    if (playAlarm) {
      if (this.mode === 'break') {
        this.completedSessions += 1;
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
}
