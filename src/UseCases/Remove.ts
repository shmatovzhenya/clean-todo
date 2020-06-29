import { Todo, ITodoList } from '../domain';
import { Mapper, UseCase, StorageErrors } from './types';


type Context = {
  todoList: ITodoList;
};

type Session = {
  remove: Mapper<Todo[], void | StorageErrors>;
};

class Remove implements UseCase<Context, ITodoList | StorageErrors> {
  constructor(private session: Session) {}

  async execute({ todoList }: Context): Promise<ITodoList | StorageErrors> {
    console.log(Array.from(todoList));
    const result = todoList.remove();
    console.log(Array.from(result));
    const error = await this.session.remove.map(Array.from(result));
    
    if (error || error === 0) {
      // @TODO: realize undo method in business layer
      return error;
    }

    return result;
  }
}

export {
  Context,
  Session,
  Remove,
};
