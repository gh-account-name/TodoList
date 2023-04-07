import { action, computed, observable, makeObservable, reaction } from 'mobx';
import { EditFormEntity, TaskEntity } from 'domains/index';
import { TasksAgentInstance } from 'http/agent';
import { mapToInternalTask } from 'helpers/index';

type PrivateFields = '_task' | '_isTaskLoading' | '_taskId';

export class EditTaskFormStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _task: observable,
      _isTaskLoading: observable,
      _taskId: observable,

      task: computed,
      isTaskLoading: computed,
      taskId: computed,

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

  private _taskId: undefined | string = undefined;

  get task(): TaskEntity | undefined {
    return this._task;
  }

  set task(value: TaskEntity | undefined) {
    this._task = value;
  }

  get isTaskLoading(): boolean {
    return this._isTaskLoading;
  }

  set isTaskLoading(value: boolean) {
    this._isTaskLoading = value;
  }

  get taskId(): undefined | string {
    return this._taskId;
  }

  set taskId(value: undefined | string) {
    this._taskId = value;
  }

  loadTask = async (taskId: string | undefined) => {
    if (taskId) {
      this.isTaskLoading = true;

      try {
        const task = await TasksAgentInstance.getTask(taskId);
        this.task = mapToInternalTask(task);
      } catch (er) {
        alert('Ошибка. Не удалось загрузить таск');
        throw er;
      } finally {
        this.isTaskLoading = false;
      }
    }
  };

  editTask = async (taskId: string | undefined, body: EditFormEntity) => {
    if (taskId) {
      this.isTaskLoading = true;

      try {
        await TasksAgentInstance.updateTask(taskId, {
          name: body.name,
          info: body.info,
          isImportant: body.isImportant,
          isCompleted: body.isDone,
        });
      } catch (er) {
        alert('Ошибка. Не удалось обновить таск');
        throw er;
      } finally {
        this.isTaskLoading = false;
      }
    }
  };
}

export const EditTaskFormStoreInstance = new EditTaskFormStore();
