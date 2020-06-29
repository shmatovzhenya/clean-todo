import { ITodoList, Todo, Status } from '../domain';
import { UseCase } from './types';


type Context = {
  todoList: ITodoList;
  status: Status;
};

class GetByStatus implements UseCase<Context, ITodoList> {
  async execute({ todoList, status }: Context): Promise<ITodoList> {
    return todoList.findByStatus(status);
  }
}

export {
  Context,
  GetByStatus,
};
