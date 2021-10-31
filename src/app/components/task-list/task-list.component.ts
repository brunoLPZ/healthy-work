import { Overlay } from '@angular/cdk/overlay';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task, TaskStatus } from 'src/app/models/task';
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

  constructor(
    private dialog: MatDialog,
    private overlay: Overlay,
    private taskService: TasksService
  ) {}

  getTaskStatusIcon(task: Task): string {
    switch (task.status) {
      case TaskStatus.PENDING:
        return 'pending';
      case TaskStatus.BLOCKED:
        return 'block';
      case TaskStatus.DONE:
        return 'check_circle';
      default:
        return 'help_outline';
    }
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
        this.taskService.editTask({
          id: task.id,
          ...result,
        });
        this.tasks = this.taskService.getTasks();
      }
    });
  }

  deleteTask(task: Task): void {
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
}
