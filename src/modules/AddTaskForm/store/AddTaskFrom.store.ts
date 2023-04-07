import { action, computed, observable, makeObservable } from 'mobx';
import { TasksAgentInstance } from 'http/agent';
import { AddTaskRequest } from 'http/model';

type PrivateFields = '_isTasksLoading';

export class AddTaskFormStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isTasksLoading: observable,

      isTasksLoading: computed,

      addTask: action,
    });
  }

  private _isTasksLoading = false;

  get isTasksLoading(): boolean {
    return this._isTasksLoading;
  }

  set isTasksLoading(value: boolean) {
    this._isTasksLoading = value;
  }

  addTask = async (taskData: AddTaskRequest) => {
    this.isTasksLoading = true;
    try {
      taskData.isCompleted = false; // Эта строка нужна чтобы таска потом отображалась в Active
      await TasksAgentInstance.addTask(taskData);
    } catch (er) {
      alert('Ошибка. Попробуйте снова позже.');
      throw er;
    } finally {
      this.isTasksLoading = false;
    }
  };
}

export const AddTaskFormStoreInstance = new AddTaskFormStore();
