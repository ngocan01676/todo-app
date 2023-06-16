import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskAddComponent } from './pages/task-add/task-add.component';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskAddComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TaskModule { }
