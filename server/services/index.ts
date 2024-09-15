import DatabaseService from './database';
import TaskService from './task';

const taskService: TaskService = new TaskService(new DatabaseService('tasks.json'));

export { taskService };
