import React from 'react';
import { PageContainer } from 'components/index';
import { AddTaskForm } from 'modules/index';

export function AddTaskPage() {
  return (
    <PageContainer>
      <h1 className="text-center">TODO LIST | ADD TASK</h1>
      <AddTaskForm />
    </PageContainer>
  );
}
