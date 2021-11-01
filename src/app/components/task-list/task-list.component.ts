import { Overlay } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { TasksService } from 'src/app/services/task.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-list',
  styleUrls: ['task-list.component.scss'],
  templateUrl: 'task-list.component.html',
})
export class TaskListComponent {
  displayedColumns: string[] = ['id', 'name', 'status'];

  @Input() tasks: Task[] = [];
  @Output() activeTask: EventEmitter<Task> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private overlay: Overlay,
    private taskService: TasksService
  ) {}

  getTaskStatusIcon(task: Task): string {
    return this.taskService.getStatusIcon(task);
  }

  getTaskActiveIcon(task: Task): string {
    return task.active ? 'star' : 'star_border';
  }

  editTask(task: Task): void {
    const taskDialog = this.dialog.open(TaskDialogComponent, {
      autoFocus: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      disableClose: true,
      width: '30rem',
      data: task,
    });

    taskDialog.afterClosed().subscribe((result) => {
      if (result) {
        const edittedTask = {
          id: task.id,
          ...result,
        };
        this.taskService.editTask(edittedTask);
        const activeTask = this.taskService.getActiveTask();
        if (activeTask && task.id === activeTask.id) {
          this.activeTask.emit(edittedTask);
        }
        this.tasks = this.taskService.getTasks();
      }
    });
  }

  deleteTask(task: Task): void {
    const activeTask = this.taskService.getActiveTask();
    if (activeTask && task.id === activeTask.id) {
      this.activeTask.emit();
    }
    this.taskService.deleteTask(task.id);
    this.tasks = this.taskService.getTasks();
  }

  createTask(): void {
    const taskDialog = this.dialog.open(TaskDialogComponent, {
      autoFocus: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      disableClose: true,
      width: '30rem',
      data: {},
    });

    taskDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.createTask({
          id: uuidv4(),
          ...result,
        });
        this.tasks = this.taskService.getTasks();
      }
    });
  }

  toggleActive(task: Task): void {
    this.taskService.toggleActive(task.id, !task.active);
    if (!task.active) {
      this.activeTask.emit(task);
    } else {
      this.activeTask.emit();
    }
    this.tasks = this.taskService.getTasks();
  }
}
