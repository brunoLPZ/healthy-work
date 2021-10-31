import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-dialog',
  styleUrls: ['task-dialog.component.scss'],
  templateUrl: 'task-dialog.component.html',
})
export class TaskDialogComponent {
  taskFormGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private fb: FormBuilder
  ) {
    this.taskFormGroup = this.fb.group({
      name: [
        data.name,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(80),
        ],
      ],
      status: [data.status, Validators.required],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      name: this.taskFormGroup.get('name')?.value,
      status: this.taskFormGroup.get('status')?.value,
    });
  }
}
