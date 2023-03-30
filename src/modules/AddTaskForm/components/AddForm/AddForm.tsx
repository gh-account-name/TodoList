import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { AddTaskFormStoreInstance } from '../../store';
import { Input, Checkbox, Loader } from 'components/index';
import './AddForm.css';

function AddFormProto() {
  const { isLoading, taskName, setTaskName, taskInfo, setTaskInfo, taskIsImportant, setTaskImportance, addTask } =
    AddTaskFormStoreInstance;

  // const [nameInputValue, setNameInputValue] = useState<string>('');
  // const [descInputValue, setDescInputValue] = useState<string>('');
  // const [isImportant, setIsImportantValue] = useState<boolean>(false);

  // const onNameInputChange = (value: string) => {
  //   setNameInputValue(value);
  // };

  // const onDescInputChange = (value: string) => {
  //   setDescInputValue(value);
  // };

  // const isImportantCheckboxChange: ChangeEventHandler<HTMLElement> = () => {
  //   setIsImportantValue(!isImportant);
  // };

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    addTask();
  };
  return (
    <form id="AddForm">
      <Loader isLoading={isLoading}>
        <Input name="taskTitle" labelTitle="Task name" onChange={setTaskName} value={taskName} />
        <Input name="taskDescription" labelTitle="What to do (descripton)" onChange={setTaskInfo} value={taskInfo} />
        <Checkbox label="Important" onChange={setTaskImportance} checked={taskIsImportant} />
        <button type="submit" className="btn btn-secondary w-100 ml-auto" onClick={onSubmit}>
          Add task
        </button>
      </Loader>
    </form>
  );
}

export const AddForm = observer(AddFormProto);
