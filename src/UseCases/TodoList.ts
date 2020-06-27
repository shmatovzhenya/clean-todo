import { ITodoList, Todo } from '../domain';
import { UseCase, Mapper, StorageErrors, UseCaseErrors } from './layerTypes';
import { Create, Context as CreateContext } from './Create';
import { GetById, Context as GetByIdContext } from './GetById';
import { Concat, Context as ConcatContext } from './Concat';


type Context = CreateContext | GetByIdContext | ConcatContext;

type Item = {
  executor: UseCase<Context, ITodoList>;
  context: Omit<Context, 'todoList'>;
  name: string;
};

type Session = {
  save: Mapper<Todo, void>;
};

type Error = {
  code: UseCaseErrors | StorageErrors;
  name: string;
  context: Context;
};

class TodoList {
  constructor(
    private todoList: ITodoList,
    private session: Session,
    private items: Item[] = [],
  ) {}

  create({ message }: Omit<CreateContext, 'todoList'>): TodoList {
    const items = [{
      executor: new Create(this.session),
      context: { message },
      name: 'create',
    } as Item].concat(this.items);

    return new TodoList(this.todoList, this.session, items);
  }

  getById({ id }: Omit<GetByIdContext, 'todoList'>): TodoList {
    const items = this.items.concat([{
      executor: new GetById(),
      context: { id },
      name: 'getById',
    }]);

    return new TodoList(this.todoList, this.session, items);
  }

  concat({ id }: Omit<ConcatContext, 'todoList'>): TodoList {
    const items = this.items.concat([{
      executor: new Concat(),
      context: { id },
      name: 'concat',
    }]);

    return new TodoList(this.todoList, this.session, items);
  }

  async values(): Promise<Todo[] | Error> {
    let todoList: ITodoList = this.todoList;

    for (let item of this.items) {
      const result = await item.executor.execute({...item.context, todoList} as Context);

      if (typeof result === 'object') {
        todoList = result;
        continue;
      }

      return {
        code: result,
        context: item.context,
        name: item.name,
      } as Error;
    }

    return Array.from(todoList);
  }
}

export {
  TodoList,
};