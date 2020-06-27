import { ITodoList, Todo } from '../domain';
import { UseCase, Mapper, StorageErrors, UseCaseErrors } from './layerTypes';


type Session = {
  save: Mapper<Todo, void>;
};

type Context = {
  todoList: ITodoList;
  message: string;
};

class Create implements UseCase<Context, ITodoList> {
  constructor(private session: Session) {}

  async execute({ todoList, message }: Context): Promise<ITodoList | StorageErrors | UseCaseErrors> {
    if (message.length === 0) {
      return UseCaseErrors.EmptyValue;
    }

    const nextTodoList = todoList.add({ message });
    const lastTodo: Todo = Array.from(nextTodoList.at(nextTodoList.length - 1))[0];

    const error = await this.session.save.map(lastTodo);

    if (error) {
      return error;
    }

    return todoList;
  }
}

export {
  Session,
  Context,
  Create,
};
