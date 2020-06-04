import { Status, Todo, ITodoList } from '../domain';
import { Errors, Repository } from './types';


type Context = {
  status?: Status;
  index?: number;
};

class MarkTodosAsCompleted {
  constructor(private repository: Repository<Todo[], void>, private todoList: ITodoList) {}

  async execute(options: Context = {}): Promise<Todo[] | Errors> {
    let result = this.todoList;

    if (options.status) {
      result = result.findByStatus(options.status);
    }

    if (options.index) {
      if (options.index >= result.length) {
        return Promise.reject(Errors.NotFound);
      }

      result = result.at(this.todoList.length - options.index - 1);
    }

    result.markAsCompleted();
    this.repository.execute(Array.from(result));

    return Array.from(this.todoList);
  }
}

export {
  MarkTodosAsCompleted,
}
