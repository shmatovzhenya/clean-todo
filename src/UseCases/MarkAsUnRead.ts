import { Todo, ITodoList, Status } from '../domain';
import { StorageErrors, Mapper, UseCase } from './types';

type Session = {
  update: Mapper<Todo[], void | StorageErrors>;
};

type Context = {
  todoList: ITodoList;
};

class MarkAsUnRead implements UseCase<Context, ITodoList | StorageErrors> {
  constructor(private session: Session) {}

  async execute({ todoList }: Context): Promise<ITodoList | StorageErrors> {
    const backup: Todo[] = Array.from(todoList).filter(todo => todo.status !== Status.New);
    const nextTodoList = todoList.markAsNew();
    const error = await this.session.update.map(Array.from(nextTodoList));

    if (error || error === 0) {
      backup.forEach(({ id }): void => {
        todoList.getById(id).markAsCompleted();
      });

      return error;
    }

    return nextTodoList;
  }
}

export {
  Context,
  Session,
  MarkAsUnRead,
};
