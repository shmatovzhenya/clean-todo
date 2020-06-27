import { ITodoList } from '../domain';
import { UseCase, UseCaseErrors } from './types';


type Context = {
  id: string;
  todoList: ITodoList;
};

class GetById implements UseCase<Context, ITodoList> {
  async execute({ id, todoList }: Context): Promise<ITodoList | UseCaseErrors> {
    const nextTodoList = todoList.getById(id);

    if (nextTodoList.length === 0) {
      return UseCaseErrors.NotFound;
    }

    return nextTodoList;
  }
}

export {
  Context,
  GetById,
};
