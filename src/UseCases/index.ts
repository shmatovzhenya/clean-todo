import { TodoFactory, ITodoList, Todo, Status } from '../domain';
import { TodoList, Session as InnerSession } from './TodoList';
import { Mapper, StorageErrors, UseCaseErrors } from './types';

type Session = InnerSession & {
  load: Mapper<void, Todo[]>;
};

class TodoListFactory {
  private factory: TodoFactory = new TodoFactory();

  constructor(private session: Session) {}

  async create() {
    const todos: ITodoList = this.factory.create();

    return new TodoList(todos, this.session);
  }

  async hydrate() {
    const todos: Todo[] | StorageErrors = await this.session.load.map();

    if (typeof todos === 'object') {
      const todoList: ITodoList = this.factory.hydrate(todos);

      return new TodoList(todoList, this.session);
    }

    return new TodoList(this.factory.create(), this.session);
  }
}

export {
  TodoListFactory,
  StorageErrors,
  UseCaseErrors,
  Mapper,
  Todo,
  Session,
  Status,
};
