import { FILTER_TYPES } from 'constants/index';

export interface TaskEntity {
  name: string;
  id: string;
  info: string;
  isImportant: boolean;
  isDone: boolean;
}

export interface TasksStatsEntity {
  total: number;
  important: number;
  done: number;
}

export type FiltersType = typeof FILTER_TYPES[keyof typeof FILTER_TYPES];

export interface SearchFormEntity {
  searchValue: string;
  filterType: string;
}

export const EmptyTask: TaskEntity = {
  id: '',
  name: '',
  info: '',
  isImportant: false,
  isDone: false,
};
