import { Injectable } from '@angular/core';
import { Task } from '../models/task';

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
    const localStorageSettings = localStorage.getItem(LOCAL_STORAGE_TASKS);
    if (localStorageSettings) {
      return JSON.parse(localStorageSettings);
    }
    return [];
  }
}
