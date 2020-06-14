import { ITodoList, Todo } from '../domain';
import {
  Interceptor,
  Item,
  UseCase,
  Result,
  BusinessErrors,
  StorageErrors,
  Repository,
} from './types';


type Session = {
  createTodoRepository: Repository<Todo, void>,
};

class CreateTodo implements UseCase<Todo> {
  constructor(private todoList: ITodoList, private createTodoRepository: Repository<Todo, void>) {}

  async execute(options: { message: string }): Promise<Result> {
    if (options.message.length === 0) {
      return 'EmptyMessage';
    }

    this.todoList.add({ message: options.message });
    const [ lastUpdatedTodo ] = Array.from(this.todoList.at(0));

    await this.createTodoRepository.execute(lastUpdatedTodo);

    return this.todoList;
  }
}

const calculateValues = async (values: Item[]): Promise<Result> => {
  if (values.length < 2) {
    const { executor, context } = values[0];
    const result: Result = await executor.execute(context);

    return result;
  }

  const { executor, context } = values[0];
  const result: Result = await executor.execute(context);

  if (typeof result !== 'object') {
    return result;
  }

  return await calculateValues(values.slice(1));
};


class TodoInterceptor implements Interceptor {
  constructor(private todoList: ITodoList, private list: Item[], private session: Session) {}

  create(context: { message: string }): TodoInterceptor {
    const firstInQueue: Item[] = [{
      context,
      executor: new CreateTodo(this.todoList, this.session.createTodoRepository),
    }];

    const list: Item[] = firstInQueue.concat(this.list);

    return new TodoInterceptor(this.todoList, list, this.session);
  }

  async values(): Promise<Todo[] | BusinessErrors | StorageErrors> {
    if (this.list.length === 0) {
      return [];
    }

    const result: Result = await calculateValues(this.list);

    if (typeof result === 'object') {
      return Array.from(result);
    }

    return Promise.reject(result);
  }
}

export {
  TodoInterceptor,
}
