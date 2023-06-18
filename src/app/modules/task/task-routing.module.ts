import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskAddComponent } from './pages/task-add/task-add.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',component: TaskListComponent
      },
      {
        path: 'task/add',component: TaskAddComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {}
