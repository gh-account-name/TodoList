import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { EditTaskFormStoreInstance } from '../../store';
import { Input, Checkbox, Loader } from 'components/index';
import './EditForm.css';

function EditFormProto() {
  const {
    editTask,
    taskName,
    setTaskName,
    taskInfo,
    setTaskInfo,
    taskIsComplete,
    setTaskCompleteness,
    taskIsImportant,
    setTaskImportance,
    isTaskLoading,
  } = EditTaskFormStoreInstance;

  // const [nameInputValue, setNameInputValue] = useState<string>(task.name);
  // const [descInputValue, setDescInputValue] = useState<string>(task.info);
  // const [isImportant, setIsImportantValue] = useState<boolean>(task.isImportant);
  // const [isCompleted, setIsCompletedValue] = useState<boolean>(task.isDone);

  // пользовательский хук для привязки значения инпута к переменной сразу при объявлении;
  // function useInputChange(initialValue: string | number) {
  //   const [inputValue, setInputValue] = useState(initialValue);
  //   const onInputChange = (value: string | number) => {
  //     setInputValue(value);
  //   };
  //   return [inputValue, onInputChange];
  // }

  // const onNameInputChange = (value: string) => {
  //   setTaskName(value);
  // };

  // const onDescInputChange = (value: string) => {
  //   setDescInputValue(value);
  // };

  // const isImportantCheckboxChange: ChangeEventHandler<HTMLElement> = () => {
  //   setIsImportantValue(!isImportant);
  // };

  // const isCompletedCheckboxChange: ChangeEventHandler<HTMLElement> = () => {
  //   setIsCompletedValue(!isCompleted);
  // };

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    editTask();
  };
  return (
    <form id="EditForm">
      <Loader isLoading={isTaskLoading}>
        <Input name="taskTitle" labelTitle="Task name" onChange={setTaskName} value={taskName ? taskName : ''} />
        <Input
          name="taskDescription"
          labelTitle="What to do (descripton)"
          onChange={setTaskInfo}
          value={taskInfo ? taskInfo : ''}
        />
        <Checkbox label="Important" checked={taskIsImportant} onChange={setTaskImportance} />
        <Checkbox label="Completed" checked={taskIsComplete} onChange={setTaskCompleteness} />

        <button type="submit" className="btn btn-secondary w-100 ml-auto" onClick={onSubmit}>
          Edit task
        </button>
      </Loader>
    </form>
  );
}

export const EditForm = observer(EditFormProto);
