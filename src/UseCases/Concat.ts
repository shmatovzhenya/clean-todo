import { ITodoList } from '../domain';
import { UseCase, UseCaseErrors } from './types';


type Context = {
  id: string;
  todoList: ITodoList;
};

class Concat implements UseCase<Context, ITodoList> {
  async execute({ id, todoList }: Context): Promise<ITodoList | UseCaseErrors> {
    const oldLength = todoList.length;
    const nextTodoList = todoList.addToSequence(id);
    const currentLength = nextTodoList.length;

    if (oldLength === currentLength) {
      return UseCaseErrors.NotFound;
    }

    return nextTodoList;
  }
}

export {
  Context,
  Concat,
};
