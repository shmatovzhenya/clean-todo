import { ITodoList, Todo } from '../domain';
import { UseCase, Mapper } from './layerTypes';
import { Create, Context as CreateContext } from './Create';
import { GetById, Context as GetByIdContext } from './GetById';
import { Concat, Context as ConcatContext } from './Concat';


type Context = CreateContext | GetByIdContext | ConcatContext;

type Item = {
  executor: UseCase<Context, ITodoList>;
  context: Omit<Context, 'todoList'>;
};

type Session = {
  save: Mapper<Todo, void>;
};

class TodoList {
  constructor(
    private todoList: ITodoList,
    private session: Session,
    private items: Item[] = [],
  ) {}

  create({ message }: CreateContext): TodoList {
    const items = this.items.concat([{
      executor: new Create(this.session),
      context: { message },
    }]);

    return new TodoList(this.todoList, this.session, items);
  }
}
