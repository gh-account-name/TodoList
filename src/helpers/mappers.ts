import { GetAllTasksQuery, GetAllTasksResponse, GetTaskResponse } from 'http/index';
import { FILTER_TYPES } from 'constants/index';
import { TaskEntity, SearchFormEntity, TasksStatsEntity } from 'domains/index';

export const mapToExternalParams = (params?: SearchFormEntity): GetAllTasksQuery | undefined => {
  if (!params) return undefined;

  const { searchValue, filterType } = params;
  let isCompleted;

  if (filterType === FILTER_TYPES.DONE) isCompleted = true;
  else if (filterType === FILTER_TYPES.ACTIVE) isCompleted = false;

  return {
    name_like: searchValue,
    isImportant: filterType === FILTER_TYPES.IMPORTANT ? true : undefined,
    isCompleted,
  };
};

export const mapToInternalTasks = (tasks: GetAllTasksResponse): TaskEntity[] => {
  const internalTasks: TaskEntity[] = [];

  tasks.forEach((task) => {
    if (task.id) {
      internalTasks.push({
        id: String(task.id),
        name: task.name || 'Неизвестно',
        info: task.info || 'Неизвестно',
        isDone: task.isCompleted || false,
        isImportant: task.isImportant || false,
      });
    }
  });

  return internalTasks;
};

export const getInternalTasksStats = (tasks: GetAllTasksResponse): TasksStatsEntity => {
  const total = tasks.length;
  const otherStats = tasks.reduce(
    (acc, task) => {
      return {
        important: task.isImportant ? acc.important + 1 : acc.important,
        done: task.isCompleted ? acc.done + 1 : acc.done,
      };
    },
    {
      important: 0,
      done: 0,
    }
  );

  return {
    total,
    ...otherStats,
  };
};

export const mapToInternalTask = (task: GetTaskResponse): TaskEntity | undefined => {
  if (!task) return undefined;

  const internalTask: TaskEntity = {
    id: String(task.id),
    name: task.name || 'Неизвестно',
    info: task.info || 'Неизвестно',
    isDone: task.isCompleted || false,
    isImportant: task.isImportant || false,
  };

  return internalTask;
};
