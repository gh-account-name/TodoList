import { action, computed, observable, makeObservable, reaction } from 'mobx';
import { EditFormEntity, TaskEntity } from 'domains/index';
import { TasksMock } from '__mocks__/index';
import { delay } from 'helpers/index';

type PrivateFields = '_task' | '_isTaskLoading';

export class EditTaskFormStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _task: observable,
      _isTaskLoading: observable,
      taskId: observable,

      task: computed,
      isTaskLoading: computed,

      loadTask: action,
      editTask: action,
    });

    reaction(
      () => this.taskId,
      (): void => {
        this.loadTask(this.taskId);
      }
    );
  }

  private _task: TaskEntity | undefined = undefined;

  private _isTaskLoading = false;

  taskId: undefined | string = undefined;

  get task(): TaskEntity | undefined {
    return this._task;
  }

  get isTaskLoading(): boolean {
    return this._isTaskLoading;
  }

  loadTask = async (id: string | undefined) => {
    this._isTaskLoading = true;

    console.log(`searching id:${id}...`);
    this._task = TasksMock.find((task) => task.id == id);
    await delay(3000);
    console.log(`success!`);

    this._isTaskLoading = false;
  };

  editTask = async (id: string | undefined, body: EditFormEntity) => {
    if (id) {
      this._isTaskLoading = true;

      console.log(id, body);
      console.log(`sending data...`);
      await delay(3000);
      console.log(`success!`);

      this._isTaskLoading = false;
    } else {
      console.error('action has blocked because id is undefined');
    }
  };
}

export const EditTaskFormStoreInstance = new EditTaskFormStore();
