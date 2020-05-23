import { TodoFactory, Todo, ITodoList } from '../domain';
import { Repository } from './types';


class RestoreTodoList {
  constructor(private storage: Repository<void, Todo[]>) {}

  async execute(): Promise<ITodoList> {
    const todos = await this.storage.execute();

    return new TodoFactory().hydrate(todos);
  }
}

export {
  RestoreTodoList,
};
