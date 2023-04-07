import { BasicAgent } from './Basic.agent';
import {
  GetAllTasksQuery,
  GetAllTasksResponse,
  AddTaskRequest,
  UpdateTaskRequest,
  UpdateTaskResponse,
  GetTaskResponse,
} from 'http/model';

class TasksAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async getAllTasks(params?: GetAllTasksQuery): Promise<GetAllTasksResponse> {
    const { data } = await this._http.get<GetAllTasksResponse>('/tasks', {
      params,
    });

    return data;
  }

  async updateTask(id: string, newData: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { data } = await this._http.patch<UpdateTaskResponse>(`/tasks/${id}`, newData);

    return data;
  }

  async deleteTask(id: string): Promise<void> {
    await this._http.delete(`/tasks/${id}`);
  }

  async addTask(body: AddTaskRequest): Promise<void> {
    await this._http.post('/tasks', body);
  }

  async getTask(id: string): Promise<GetTaskResponse> {
    const { data } = await this._http.get<GetTaskResponse>(`/tasks/${id}`);

    return data;
  }
}

export const TasksAgentInstance = new TasksAgent();
