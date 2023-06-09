import React from 'react';
import { observer } from 'mobx-react';
import { Task } from '../Task';
import { TasksStoreInstance } from '../../store';
import { Loader } from 'components/index';

function TasksListProto() {
  const { tasks, isTasksLoading, changeTaskImportance, changeTaskCompleteness, deleteTask } = TasksStoreInstance;

  return (
    <div className="tasks-wrapper d-flex align-items-center justify-content-center">
      <Loader isLoading={isTasksLoading}>
        {tasks?.length ? (
          <ul className="list-group todo-list mb-3 w-100">
            {tasks.map((task) => {
              return (
                <li key={task.id} className="list-group-item">
                  <Task
                    key={task.id}
                    task={task}
                    changeTaskImportance={changeTaskImportance}
                    changeTaskCompleteness={changeTaskCompleteness}
                    deleteTask={deleteTask}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Not found</p>
        )}
      </Loader>
    </div>
  );
}

export const TasksList = observer(TasksListProto);
