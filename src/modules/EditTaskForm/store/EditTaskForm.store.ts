import { action, computed, observable, makeObservable } from 'mobx';
import { EmptyTask, TaskEntity } from 'domains/index';
import { TasksMock } from '__mocks__/index';
import { delay } from 'helpers/index';

type PrivateFields = '_task' | '_isTaskLoading';

export class EditTaskFormStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _task: observable,
      _isTaskLoading: observable,
      taskName: observable,
      taskInfo: observable,
      taskIsComplete: observable,
      taskIsImportant: observable,

      task: computed,
      isTaskLoading: computed,

      loadTask: action,
      editTask: action,
      setTaskName: action,
      setTaskInfo: action,
      setTaskCompleteness: action,
      setTaskImportance: action,
    });
  }

  private _task: TaskEntity | undefined = EmptyTask;

  private _isTaskLoading = false;

  taskName = this.task?.name;

  taskInfo = this.task?.info;

  taskIsComplete = this.task?.isDone;

  taskIsImportant = this.task?.isImportant;

  get task(): TaskEntity | undefined {
    return this._task;
  }

  get isTaskLoading(): boolean {
    return this._isTaskLoading;
  }

  loadTask = async (id: string) => {
    this._isTaskLoading = true;

    console.log(`searching id:${id}`);

    this._task = TasksMock.find((task) => task.id == id);

    this.taskName = this.task?.name;
    this.taskInfo = this.task?.info;
    this.taskIsComplete = this.task?.isDone;
    this.taskIsImportant = this.task?.isImportant;

    await delay(3000);

    this._isTaskLoading = false;
  };

  editTask = async () => {
    if (this._task != undefined) {
      this._isTaskLoading = true;

      console.log({
        id: this.task?.id,
        name: this.taskName,
        info: this.taskInfo,
        isDone: this.taskIsComplete,
        isImportant: this.taskIsImportant,
      });
      console.log(`sending data...`);
      await delay(3000);

      this._isTaskLoading = false;
    } else {
      console.error('action has blocked because task is undefined');
    }
  };

  setTaskName = (value: string) => {
    this.taskName = value;
  };

  setTaskInfo = (value: string) => {
    this.taskInfo = value;
  };

  setTaskCompleteness = () => {
    this.taskIsComplete = !this.taskIsComplete;
  };

  setTaskImportance = () => {
    this.taskIsImportant = !this.taskIsImportant;
  };
}

export const EditTaskFormStoreInstance = new EditTaskFormStore();
