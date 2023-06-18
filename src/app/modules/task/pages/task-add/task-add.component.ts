import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../../model/task.model';
import { TaskViewModel } from '../../viewmodel/task.viewmode';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskAddComponent implements OnInit{
  model: FormGroup;
  task: ITask = {
    title: '',
    description: '',
    dueDate: (new Date()).toISOString().substring(0,10),
    pioriry: 'normal',
    isComplete: false,
    isToggle: false
  };

  currentDate =  (new Date()).toISOString().substring(0,10);
  constructor(private fb: FormBuilder, 
    private taskViewModel: TaskViewModel,
    private router: Router,
    private toastService: ToastService) {
    
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.model = this.fb.group({
      title: [this.task?.title, [
        Validators.required
      ]],
      description: [this.task?.description],
      dueDate: [this.task?.dueDate,[
        Validators.required
      ]],
      pioriry: [this.task?.pioriry],
      isComplete: [this.task?.isComplete],
      isToggle: [this.task?.isToggle]
    });
  }

  onSubmit() {
    if (this.model.valid) {
      this.taskViewModel.addTask(this.model.value);
      this.toastService.success("Add success");
      this.router.navigate(['']);
    } else {
      this.toastService.error("Title required, Please check again");
    }
  }

}
