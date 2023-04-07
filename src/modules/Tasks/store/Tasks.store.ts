import { action, computed, observable, makeObservable } from 'mobx';
import { SearchFormEntity, TasksStatsEntity, TaskEntity } from 'domains/index';
import { getInternalTasksStats, mapToExternalParams, mapToInternalTasks } from 'helpers/index';
import { TasksAgentInstance } from 'http/agent';

type PrivateFields = '_tasks' | '_tasksStats' | '_isTasksLoading' | '_searchParams';

export class TasksStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _tasks: observable,
      _tasksStats: observable,
      _isTasksLoading: observable,
      _searchParams: observable,

      tasks: computed,
      tasksStats: computed,
      isTasksLoading: computed,

      loadTasks: action,
      changeTaskImportance: action,
      changeTaskCompleteness: action,
      deleteTask: action,
    });
  }

  private _isTasksLoading = false;

  private _tasks: TaskEntity[] | null = [];

  private _tasksStats: TasksStatsEntity | null = {
    total: 0,
    important: 0,
    done: 0,
  };

  private _searchParams: SearchFormEntity = {
    searchValue: '',
    filterType: 'All',
  };

  get isTasksLoading(): boolean {
    return this._isTasksLoading;
  }

  set isTasksLoading(value: boolean) {
    this._isTasksLoading = value;
  }

  get tasks(): TaskEntity[] | null {
    return this._tasks;
  }

  set tasks(value: TaskEntity[] | null) {
    this._tasks = value;
  }

  get tasksStats(): TasksStatsEntity | null {
    return this._tasksStats;
  }

  set tasksStats(value: TasksStatsEntity | null) {
    this._tasksStats = value;
  }

  getTasks = async (searchParams?: SearchFormEntity) => {
    const externalSearchParams = mapToExternalParams(searchParams);
    const res = await TasksAgentInstance.getAllTasks(externalSearchParams);

    return {
      tasks: mapToInternalTasks(res),
      tasksStats: getInternalTasksStats(res),
    };
  };

  loadTasks = async (searchParams?: SearchFormEntity) => {
    this.isTasksLoading = true;
    try {
      if (searchParams) this._searchParams = searchParams;

      const { tasks, tasksStats } = await this.getTasks(this._searchParams);

      this.tasks = tasks;
      this.tasksStats = tasksStats;
    } catch (er) {
      alert('Ошибка. Не удалось загрузить таски');
      this.tasks = null;
      this.tasksStats = null;
      throw er;
    } finally {
      this.isTasksLoading = false;
    }
  };

  changeTaskImportance = async (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this.isTasksLoading = true;

    try {
      await TasksAgentInstance.updateTask(taskId, {
        isImportant: !currentStatus,
      });

      const { tasks, tasksStats } = await this.getTasks(this._searchParams);

      this.tasks = tasks;
      this.tasksStats = tasksStats;
    } catch (er) {
      alert('Ошибка. Попробуйте снова позже.');
      this.tasks = null;
      this.tasksStats = null;
      throw er;
    } finally {
      this.isTasksLoading = false;
    }
  };

  changeTaskCompleteness = async (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this.isTasksLoading = true;

    try {
      await TasksAgentInstance.updateTask(taskId, {
        isCompleted: !currentStatus,
        isImportant: currentStatus ? undefined : false,
      });

      const { tasks, tasksStats } = await this.getTasks(this._searchParams);

      this.tasks = tasks;
      this.tasksStats = tasksStats;
    } catch (er) {
      alert('Ошибка. Попробуйте снова позже.');
      this.tasks = null;
      this.tasksStats = null;
      throw er;
    } finally {
      this.isTasksLoading = false;
    }
  };

  deleteTask = async (taskId: TaskEntity['id']) => {
    this.isTasksLoading = true;
    try {
      await TasksAgentInstance.deleteTask(taskId);

      const { tasks, tasksStats } = await this.getTasks(this._searchParams);

      this.tasks = tasks;
      this.tasksStats = tasksStats;
    } catch (er) {
      alert('Ошибка. Попробуйте снова позже.');
      this.tasks = null;
      this.tasksStats = null;
      throw er;
    } finally {
      this.isTasksLoading = false;
    }
  };
}

export const TasksStoreInstance = new TasksStore();
