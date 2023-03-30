import { action, computed, observable, makeObservable } from 'mobx';
import { SearchFormEntity, TasksStatsEntity, TaskEntity } from 'domains/index';
import { TasksMock, TasksStatsMock } from '__mocks__/index';
import { delay } from 'helpers/index';

type PrivateFields = '_tasks' | '_tasksStats' | '_isTasksLoading';

export class TasksStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _tasks: observable,
      _tasksStats: observable,
      _isTasksLoading: observable,

      tasks: computed,
      isTasksLoading: computed,

      loadTasks: action,
      changeTaskImportance: action,
      changeTaskCompleteness: action,
      deleteTask: action,
    });
  }

  _isTasksLoading = false;

  get isTasksLoading(): boolean {
    return this._isTasksLoading;
  }

  private _tasks: TaskEntity[] = [];

  get tasks(): TaskEntity[] {
    return this._tasks;
  }

  private _tasksStats: TasksStatsEntity = {
    total: 0,
    important: 0,
    done: 0,
  };

  get tasksStats(): TasksStatsEntity {
    return this._tasksStats;
  }

  loadTasks = async (searchParams?: SearchFormEntity) => {
    this._isTasksLoading = true;

    console.log(searchParams);
    this._tasks = TasksMock;
    this._tasksStats = TasksStatsMock;
    await delay(3000);

    this._isTasksLoading = false;
  };

  changeTaskImportance = (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this._isTasksLoading = true;
    // TODO: Добавить запрос к серверу
    console.log('important', taskId, !currentStatus);
    this.loadTasks();
  };

  changeTaskCompleteness = (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this._isTasksLoading = true;
    // TODO: Добавить запрос к серверу
    console.log('complete', taskId, !currentStatus);
    this.loadTasks();
  };

  deleteTask = (taskId: TaskEntity['id']) => {
    this._isTasksLoading = true;
    // TODO: Добавить запрос к серверу
    console.log('delete', taskId);
    this.loadTasks();
  };
}

export const TasksStoreInstance = new TasksStore();
