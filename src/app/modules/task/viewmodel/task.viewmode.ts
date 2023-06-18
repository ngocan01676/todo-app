import { Injectable } from '@angular/core';
import { makeAutoObservable } from 'mobx';
import { ITask } from '../model/task.model';
import { ToastService } from 'angular-toastify';

@Injectable()

export class TaskViewModel {
    allTask: ITask[] = [];
    constructor(private toastService: ToastService) {
        makeAutoObservable(this);
    }

    /**
     * add Task
     * @returns
     */
    addTask(task: ITask) {
        const localStorageItem = localStorage.getItem('allTask') || null;
        if (localStorageItem != null) {
            this.allTask = [...JSON.parse(localStorageItem), task];
        } else {
            this.allTask = [task];
        }
        localStorage.setItem("allTask", JSON.stringify(this.allTask));
    }

    /**
     * get all Task
     * @returns
     */
    getAllTask() {
        const allItemsStr = localStorage.getItem("allTask");
        if (allItemsStr) {
            this.allTask = JSON.parse(allItemsStr);
        }
    }

    /**
     * change status Task
     * @returns
     */
    changeStatusListItems(todoAddCheck: number[], todoRemoveCheck: number[]) {
        this.allTask.forEach((x: ITask, index: number) => {
            if (todoRemoveCheck.includes(index)) {
                x.isComplete = false;
            }
            if (todoAddCheck.includes(index)) {
                x.isComplete = true;
            }
            this.allTask = [...this.allTask];
            localStorage.setItem("allTask", JSON.stringify(this.allTask));
        })
        this.toastService.success('Update success');
    }

    /**
     * Remove item Task
     * @returns
     */

    removeListItems(indexArr: number[]) {
        if (indexArr.length == 0) {
            this.toastService.success('Please choose items');
            return;
        }
        this.allTask = [...this.allTask.filter((_: ITask, index: number) => !indexArr.includes(index))];
        localStorage.setItem("allTask", JSON.stringify(this.allTask));
        this.toastService.success('Remove success');
    }

    /**
     * update status task
     * @returns
     */
    updatetask(item: ITask, index: number) {
        this.allTask[index].title = item?.title;
        this.allTask[index].description = item?.description;
        this.allTask[index].dueDate = item?.dueDate;
        this.allTask[index].pioriry = item?.pioriry;
        localStorage.setItem("allTask", JSON.stringify(this.allTask));
    }


    /**
     * remove Task
     * @returns
     */
    removeTask(indexToRemove: number) {
        this.allTask = [...this.allTask.slice(0, indexToRemove), ...this.allTask.slice(indexToRemove + 1)];
        this.toastService.success('Remove success');
        localStorage.setItem("allTask", JSON.stringify(this.allTask));
    }
}