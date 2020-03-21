import { Status, ITodoFactory } from './types';
import { TodoList, TodoCollection } from './TodoList';


class TodoFactory implements ITodoFactory {
  create() {
    return new TodoList(new TodoCollection(), { indexMap: new Set([]) });
  }
}

export { TodoFactory, Status };
