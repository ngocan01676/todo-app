import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskModule } from './modules/task/task.module';
import { AngularToastifyModule, ToastService } from 'angular-toastify';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularToastifyModule,
    TaskModule,
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
