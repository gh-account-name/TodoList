import { observer } from 'mobx-react';
import { EditForm } from './components';

function EditTaskFormProto() {
  return <EditForm />;
}

export const EditTaskForm = observer(EditTaskFormProto);
