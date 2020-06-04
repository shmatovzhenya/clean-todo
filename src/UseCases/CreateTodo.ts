import { Todo, ITodoList } from '../domain';
import { Repository, Errors } from './types';


class CreateTodo {
  constructor(private storage: Repository<Todo, void>, private todoList: ITodoList) {}

  async execute(message: string): Promise<Todo[] | Errors.EmptyMessage> {
    if (message.length === 0) {
      return Promise.reject(Errors.EmptyMessage);
    }

    const todoList = this.todoList.add({ message }).at(0);
    const todo: Todo = Array.from(todoList)[0];

    await this.storage.execute(todo);

    return Array.from(this.todoList);
  }
}

export {
  CreateTodo,
};
