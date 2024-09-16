import { $fetch } from 'ofetch';
import TaskService from '@/services/task';
import UserService from '@/services/user';

const baseApiUrl: string = import.meta.env.VITE_BASE_API_URL;

if (!baseApiUrl) {
  throw new Error('VITE_BASE_API_URL not found in env file');
}

const fetchApi = $fetch.create({
  baseURL: baseApiUrl,
});

const taskService: TaskService = new TaskService(fetchApi);
const userService: UserService = new UserService(fetchApi);

export { taskService, userService };
