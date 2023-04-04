import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddTaskFormStoreInstance } from '../../store';
import './AddForm.css';
import { DEFAULT_VALUES } from './AddForm.utils';
import { VALIDATION_SCHEMA } from './AddForm.validation';
import { AddFormEntity } from 'domains/index';
import { Checkbox, Loader, TextField } from 'components/index';

function AddFormProto() {
  const { isLoading, addTask } = AddTaskFormStoreInstance;

  const { handleSubmit, control, reset, setValue } = useForm<AddFormEntity>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(VALIDATION_SCHEMA),
  });

  const onNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('name', evt.target.value);
  };

  const onInfoChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('info', evt.target.value);
  };

  const onImportanceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('isImportant', evt.target.checked);
  };

  const onSubmit = handleSubmit((data: AddFormEntity) => {
    addTask(data).then(() => reset());
  });

  return (
    <form id="AddForm" onSubmit={onSubmit}>
      <Loader isLoading={isLoading}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField label="Task name" onChange={onNameChange} value={field.value} errorText={error?.message} />
          )}
        />

        <Controller
          control={control}
          name="info"
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="What to do (description)"
              onChange={onInfoChange}
              value={field.value}
              errorText={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="isImportant"
          render={({ field }) => <Checkbox label="Important" onChange={onImportanceChange} checked={field.value} />}
        />

        <button type="submit" className="btn btn-secondary w-100 ml-auto">
          Add task
        </button>
      </Loader>
    </form>
  );
}

export const AddForm = observer(AddFormProto);
