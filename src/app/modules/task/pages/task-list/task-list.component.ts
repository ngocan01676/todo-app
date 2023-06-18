import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TaskViewModel } from '../../viewmodel/task.viewmode';
import { ITask } from '../../model/task.model';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { reaction } from 'mobx';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  model: FormGroup;
  searchTerm: string;
  currentDate =  (new Date()).toISOString().substring(0,10);
  showBulkAction: boolean = false;

  constructor(public taskViewModel: TaskViewModel,
    private fb: FormBuilder,
    private toastService: ToastService) {

  }

  ngOnInit(): void {
    this.taskViewModel.getAllTask();
    this.buildForm();
    reaction(
      () => this.taskViewModel.allTask,
      () => {
        this.buildForm();
      }
    );
  }

  
  get tasksControls(): FormArray {
    return this.model.get("tasks") as FormArray;
  }

  buildForm(): void {
    this.model = this.fb.group({
      tasks: this.buildFormArray(this.taskViewModel.allTask)
    });
  }

  
  buildFormGroup(task?: ITask): FormGroup {
    return this.fb.group({
      title: [task?.title, [
        Validators.required
      ]],
      description: task?.description,
      dueDate: task?.dueDate,
      pioriry: task?.pioriry,
      isComplete: task?.isComplete,
      isToggle: task?.isToggle
    })
  }

  buildFormArray(tasks?: ITask[]) {
    const arr: FormGroup[] = [];
    if (tasks && tasks.length)
    tasks.forEach(item => {
        arr.push(this.buildFormGroup(item));
      });
    return this.fb.array(arr);
  }

  updateTask(item: AbstractControl, index: number): void {
    if (item.valid) {
      const task: ITask = item?.value;
      this.taskViewModel.updatetask(task,index);
      this.toastService.success('Update success');
    } else {
      this.toastService.error("Title can't be null, Update fail");
    }
  }

  removeItem(index: number): void {
    this.taskViewModel.removeTask(index);
  }

  toggleItem(item: AbstractControl): void {
    const newState = !item.get("isToggle")?.value;
    item.patchValue({
      isToggle: newState
    })
  }

  checkDone(): void {
    const todoRemoveCheck: number[] = [];
    const todoAddCheck: number[] = [];
    this.tasksControls.value.forEach((item: any , index: number) => {
      if (!item?.isComplete) {
        todoRemoveCheck.push(index);
      } else {
        todoAddCheck.push(index);
      }
    });
    this.taskViewModel.changeStatusListItems(todoAddCheck,todoRemoveCheck);
  }

  removeAll(): void {
    const todoRemove: number[] = [];
    this.tasksControls.value.forEach((item: any , index: number) => {
      if (item?.isComplete) {
        todoRemove.push(index);
      }
    });
    this.taskViewModel.removeListItems(todoRemove);
  }

  onCheckboxClick() {
    if (!this.showBulkAction) this.showBulkAction = true;
  }
  
}
