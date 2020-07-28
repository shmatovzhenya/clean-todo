import { Mapper, Todo, StorageErrors } from '../UseCases';
import { Repository } from './types';


type Session = {
  save: Repository<void>;
};

class SaveNewTodo implements Mapper<Todo, void> {
  constructor(private session: Session) {}

  async map(todo: Todo): Promise<void | StorageErrors> {
    await this.session.save.load(todo);
  }
}

export {
  SaveNewTodo,
  Session,
};
