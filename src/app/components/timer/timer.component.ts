import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Time } from 'src/app/models/time';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnChanges, OnDestroy {
  @Input() time?: Time;
  @Input() action: 'start' | 'stop' = 'stop';

  @Output() readonly timeEvent = new EventEmitter<Time>();

  minutes: number = 0;
  seconds: number = 0;
  animateMinuteBox: boolean = false;

  private timerInterval?: any;
  private countUntil?: number;
  private shouldEmit: boolean = true;

  constructor() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.time) {
      this.minutes = this.time?.minutes || 0;
      this.seconds = this.time?.seconds || 0;
      if (this.timerInterval) {
        console.log('Cleaning interval');
        clearInterval(this.timerInterval);
      }
      this.updateTimer();
      this.timerInterval = setInterval(() => this.updateTimer(), 100);
    }
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  updateTimer() {
    if (this.time && this.action === 'start') {
      this.shouldEmit = true;
      const now = new Date().getTime();
      if (!this.countUntil) {
        this.countUntil = new Date(
          now + this.time.minutes * 60000 + this.time.seconds * 1000
        ).getTime();
      }
      const difference = this.countUntil - now;
      if (difference > 0) {
        const newMinutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        if (this.minutes !== newMinutes) {
          this.animateMinuteBox = true;
          setTimeout(() => (this.animateMinuteBox = false), 1000);
        }
        this.minutes = newMinutes;
        this.seconds = Math.floor((difference % (1000 * 60)) / 1000);
      } else if (this.shouldEmit) {
        this.shouldEmit = false;
        this.timeEvent.emit({ minutes: 0, seconds: 0 });
      }
    } else {
      this.countUntil = undefined;
      if (
        this.shouldEmit &&
        this.time &&
        (this.time?.minutes !== 0 || this.time?.seconds !== 0)
      ) {
        this.shouldEmit = false;
        this.timeEvent.emit({ minutes: this.minutes, seconds: this.seconds });
      }
    }
  }

  formatUnit(unit: number): string {
    return unit.toString().padStart(2, '0');
  }
}
