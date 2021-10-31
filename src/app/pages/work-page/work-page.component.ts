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
  isSmallTimer: boolean = false;

  @ViewChild('tasks', { read: ElementRef }) tasks?: ElementRef;
  @ViewChild('alarm', { read: ElementRef }) alarm?: ElementRef;

  taskList: Task[];

  constructor(taskService: TasksService) {
    this.taskList = taskService.getTasks();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop) {
      this.isSmallTimer = true;
      window.scrollTo({
        top: this.tasks?.nativeElement.offsetTop,
        behavior: 'smooth',
      });
    } else {
      this.isSmallTimer = false;
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  nextMode(playAlarm: boolean) {
    this.mode = this.mode === 'work' ? 'break' : 'work';
    if (playAlarm) {
      this.playAlarm();
    }
  }

  playAlarm(): void {
    if (this.alarm) {
      this.alarm.nativeElement.play();
    }
  }
}
