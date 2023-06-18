import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskAddComponent } from './pages/task-add/task-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskViewModel } from './viewmodel/task.viewmode';
import { MobxAngularModule } from 'mobx-angular';
import { TaskFilterPipe } from './pipes/task-filter.pipe';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskAddComponent,
    TaskFilterPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MobxAngularModule
  ],
  providers: [
    TaskViewModel
  ]
})
export class TaskModule { }
