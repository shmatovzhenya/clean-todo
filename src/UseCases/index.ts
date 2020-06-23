import { ITodoList, Todo, Status } from '../domain';
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

class CreateTodo implements UseCase<{ message: string }> {
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

class GetTodoById implements UseCase<{ id: string }> {
  constructor(private todoList: ITodoList) {}

  async execute(options: { id: string }): Promise<Result> {
    const todoList = this.todoList.getById(options.id);
    console.log('GetTodoById');

    if (todoList.length === 0) {
      return 'OutOfRange';
    }

    return todoList;
  }
}

class AddTodoToSequence implements UseCase<{ id: string }> {
  constructor(private todoList: ITodoList) {}

  async execute(options: { id: string }): Promise<Result> {
    console.log('AddTodoToSequence');
    const todoList = this.todoList.addToSequence(options.id);

    return todoList;
  }
}

class GetTodosByStatus implements UseCase<{ status: Status }> {
  constructor(private todoList: ITodoList) {}

  async execute(options: { status: Status }): Promise<Result> {
    console.log('GetTodosByStatus');
    const todoList = this.todoList.findByStatus(options.status);

    return todoList;
  }
}

const calculateValues = async (values: Item[], todoList: ITodoList): Promise<Result> => {
  if (values.length < 2) {
    const { executor, context } = values[0];
    const result: Result = await executor.execute(context);

    return result;
  }

  const { executor, context } = values[values.length - 1];
  const result: Result = await executor.execute(context);
  // console.log({ executor }, JSON.stringify(context));

  if (typeof result !== 'object') {
    return result;
  }

  return await calculateValues(values.slice(0, -1), todoList);
};


class TodoInterceptor implements Interceptor {
  constructor(
    private todoList: ITodoList,
    private list: Item[],
    private session: Session,
    private currentTodoList?: ITodoList,
  ) {}

  create(context: { message: string }): TodoInterceptor {
    const firstInQueue: Item[] = [{
      context,
      executor: new CreateTodo(this.todoList, this.session.createTodoRepository),
    }];

    const list: Item[] = firstInQueue.concat(this.list);

    return new TodoInterceptor(this.todoList, list, this.session);
  }

  getById(context: { id: string }): TodoInterceptor {
    const firstInQueue: Item[] = [{
      context,
      executor: new GetTodoById(this.todoList),
    }];

    const list: Item[] = firstInQueue.concat(this.list);

    return new TodoInterceptor(this.todoList, list, this.session);
  }

  getByStatus(context: { status: Status }): TodoInterceptor {
    const firstInQueue: Item[] = [{
      context,
      executor: new GetTodosByStatus(this.todoList),
    }];

    const list: Item[] = firstInQueue.concat(this.list);

    return new TodoInterceptor(this.todoList, list, this.session);
  }

  concat(context: { id: string }): TodoInterceptor {
    const firstInQueue: Item[] = [{
      context,
      executor: new AddTodoToSequence(this.todoList),
    }];

    const list: Item[] = firstInQueue.concat(this.list);

    return new TodoInterceptor(this.todoList, list, this.session);
  }

  async values(): Promise<Todo[] | BusinessErrors | StorageErrors> {
    if (this.list.length === 0) {
      return [];
    }

    const result: Result = await calculateValues(this.list, this.todoList);

    if (typeof result === 'object') {
      return Array.from(result);
    }

    return Promise.reject(result);
  }
}

export {
  TodoInterceptor,
}
