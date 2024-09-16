import DatabaseService from './database';
import TaskService from './task';
import UserService from './user';

const taskService: TaskService = new TaskService(new DatabaseService('tasks.json'));
const userService: UserService = new UserService(new DatabaseService('users.json'));

export { taskService, userService };
