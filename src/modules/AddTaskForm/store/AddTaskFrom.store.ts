import { action, computed, observable, makeObservable } from 'mobx';
import { delay } from 'helpers/index';

type PrivateFields = '_isLoading';

export class AddTaskFormStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isLoading: observable,
      taskName: observable,
      taskInfo: observable,
      taskIsImportant: observable,

      isLoading: computed,

      setTaskName: action,
      setTaskInfo: action,
      setTaskImportance: action,
      addTask: action,
    });
  }

  private _isLoading = false;

  taskName = '';

  taskInfo = '';

  taskIsImportant = false;

  get isLoading(): boolean {
    return this._isLoading;
  }

  setTaskName = (value: string) => {
    this.taskName = value;
  };

  setTaskInfo = (value: string) => {
    this.taskInfo = value;
  };

  setTaskImportance = () => {
    this.taskIsImportant = !this.taskIsImportant;
  };

  addTask = async () => {
    this._isLoading = true;

    console.log({
      name: this.taskName,
      info: this.taskInfo,
      isImportant: this.taskIsImportant,
    });
    console.log('sending data...');
    await delay(3000);

    this._isLoading = false;
  };
}

export const AddTaskFormStoreInstance = new AddTaskFormStore();
