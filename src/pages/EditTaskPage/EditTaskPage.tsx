import React from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from 'components/index';
import { EditTaskForm } from 'modules/index';
import { TasksMock } from '__mocks__/index';
import { TaskEntity } from 'domains/Task.entity';

export function EditTaskPage() {
  const { taskId } = useParams();
  return (
    <PageContainer>
      <h1 className="text-center">TODO LIST | EDIT TASK {taskId}</h1>
      <EditTaskForm taskId={taskId} />
    </PageContainer>
  );
}
