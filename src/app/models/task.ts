export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
}

export enum TaskStatus {
  BLOCKED = 'blocked',
  PENDING = 'pending',
  DONE = 'done',
  DOUBT = 'doubt',
}
