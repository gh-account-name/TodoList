import React, { ChangeEvent, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditTaskFormStoreInstance } from '../../store';
import { DEFAULT_VALUES } from './EditForm.utils';
import { VALIDATION_SCHEMA } from './EditForm.validation';
import { TextField, Checkbox, Loader } from 'components/index';
import './EditForm.css';
import { EditFormEntity } from 'domains/index';
import { PATH_LIST } from 'constants/index';

function EditFormProto() {
  const { taskId } = useParams();

  const navigate = useNavigate();

  const { editTask, isTaskLoading, task } = EditTaskFormStoreInstance;

  const { control, setValue, handleSubmit, reset, watch } = useForm<EditFormEntity>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(VALIDATION_SCHEMA),
  });

  const completedCheckboxValue = watch('isDone');

  useEffect((): void => {
    EditTaskFormStoreInstance.taskId = taskId;
  }, [EditTaskFormStoreInstance, taskId]);

  useEffect((): void => {
    if (task) {
      reset(task);
    }
  }, [task]);

  const onNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('name', evt.target.value);
  };

  const onInfoChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('info', evt.target.value);
  };

  const onImportanceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('isImportant', evt.target.checked);
  };

  const onCompletenessChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!completedCheckboxValue) {
      setValue('isImportant', false);
    }

    setValue('isDone', evt.target.checked);
  };

  const onSubmit = handleSubmit((data) => {
    editTask(taskId, data)
      .then(() => {
        EditTaskFormStoreInstance.taskId = undefined;
        navigate(PATH_LIST.ROOT);
      })
      .catch(() => false);
  });

  return (
    <form id="EditForm" onSubmit={onSubmit}>
      <Loader isLoading={isTaskLoading}>
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
          render={({ field }) => (
            <Checkbox
              label="Important"
              onChange={onImportanceChange}
              checked={field.value}
              disabled={completedCheckboxValue}
            />
          )}
        />

        <Controller
          control={control}
          name="isDone"
          render={({ field }) => <Checkbox label="Completed" onChange={onCompletenessChange} checked={field.value} />}
        />

        <button type="submit" className="btn btn-secondary w-100 ml-auto">
          Edit task
        </button>
      </Loader>
    </form>
  );
}

export const EditForm = observer(EditFormProto);
