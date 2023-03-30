import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { EditForm } from './components';
import { EditTaskFormStoreInstance } from './store';

function EditTaskFormProto({ taskId }: any) {
  useEffect(() => {
    EditTaskFormStoreInstance.loadTask(taskId);
  });
  return <EditForm />;
}

export const EditTaskForm = observer(EditTaskFormProto);
