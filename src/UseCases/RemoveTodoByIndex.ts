import { Repository, Errors } from './types';
import { Todo, ITodoList } from '../domain';

type Context = {
  index: number;
};

class RemoveTodoByIndex {
  constructor(private repository: Repository<Todo[], void>, private todoList: ITodoList) {}

  async execute(options: Context): Promise<Todo[] | Errors> {
    let result = this.todoList;

    if (options.index >= result.length) {
      return Promise.reject(Errors.NotFound);
    }

    result = result.at(result.length - options.index - 1).remove();
    await this.repository.execute(Array.from(result));

    return Array.from(this.todoList);
  }
}

export {
  RemoveTodoByIndex,
};
