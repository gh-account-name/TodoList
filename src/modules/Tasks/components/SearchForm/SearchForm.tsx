import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { observer } from 'mobx-react';
import { TasksStoreInstance } from '../../store';
import { StatusFilter } from '../StatusFilter';
import { DEFAULT_VALUES } from './SearchForm.utils';
import { SearchInput } from 'components/index';
import { FiltersType, SearchFormEntity } from 'domains/index';
import './SearchForm.css';

function SearchFormProto() {
  const { isTasksLoading, loadTasks } = TasksStoreInstance;

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  const onSearchInputChange = (value: string) => {
    setValue('searchValue', value);
  };

  const onReset = () => {
    setValue('searchValue', '');
  };

  const onFilterChange = (type: FiltersType) => {
    setValue('filterType', type);
  };

  const onSubmit = handleSubmit((data: SearchFormEntity) => {
    loadTasks(data);
  });

  return (
    <form onSubmit={onSubmit} className="search-form d-flex justify-content-between">
      <Controller
        control={control}
        name="searchValue"
        render={({ field }) => (
          <SearchInput value={field.value} onChange={onSearchInputChange} onReset={onReset} disabled={isTasksLoading} />
        )}
      />

      <Controller
        control={control}
        name="filterType"
        render={({ field }) => (
          <StatusFilter tasksType={field.value} onChange={onFilterChange} disabled={isTasksLoading} />
        )}
      />
      <button type="submit" className="btn btn-primary" disabled={isTasksLoading}>
        Find
      </button>
    </form>
  );
}

export const SearchForm = observer(SearchFormProto);
