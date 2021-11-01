import { Injectable } from '@angular/core';
import { Task, TaskStatus } from '../models/task';

const LOCAL_STORAGE_TASKS = 'tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  createTask(task: Task) {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(LOCAL_STORAGE_TASKS, JSON.stringify(tasks));
  }

  deleteTask(id: string) {
    const tasks = this.getTasks();
    localStorage.setItem(
      LOCAL_STORAGE_TASKS,
      JSON.stringify(tasks.filter((t) => t.id !== id))
    );
  }
  editTask(task: Task) {
    const tasks = this.getTasks();
    const localStorageTask = tasks.find((t) => t.id === task.id);
    if (localStorageTask) {
      localStorageTask.name = task.name;
      localStorageTask.status = task.status;
      localStorage.setItem(LOCAL_STORAGE_TASKS, JSON.stringify(tasks));
    }
  }

  getTasks(): Task[] {
    const localStorageTasks = localStorage.getItem(LOCAL_STORAGE_TASKS);
    if (localStorageTasks) {
      return JSON.parse(localStorageTasks);
    }
    return [];
  }

  toggleActive(id: string, isActive: boolean) {
    const tasks = this.getTasks();
    tasks.forEach((t) => {
      if (t.id === id) {
        t.active = isActive;
      } else if (isActive) {
        t.active = false;
      }
    });
    localStorage.setItem(LOCAL_STORAGE_TASKS, JSON.stringify(tasks));
  }

  getActiveTask(): Task | undefined {
    const tasks = this.getTasks();
    return tasks.find((t) => t.active);
  }

  getStatusIcon(task: Task): string {
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
}
