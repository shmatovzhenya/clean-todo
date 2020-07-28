import { Mapper, Todo, StorageErrors } from '../UseCases';
import { Repository } from './types';


interface Session {
  loadTodo: Repository<Todo[]>;
}

class LoadTodoById implements Mapper<void, Todo[]> {
  constructor(private session: Session) {}

  async map(): Promise<Todo[] | StorageErrors> {
    return await this.session.loadTodo.load();
  }
}

export {
  Session,
  LoadTodoById,
};
