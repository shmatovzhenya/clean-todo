import { Mapper, Todo, StorageErrors } from '../UseCases';
import { Repository } from './types';


type Session = {
  remove: Repository<void>;
};

class RemoveTodo implements Mapper<Todo, void> {
  constructor(private session: Session) {}

  async map(todo: Todo): Promise<void | StorageErrors> {
    await this.session.remove.load(todo);
  }
}

export {
  RemoveTodo,
  Session,
};
