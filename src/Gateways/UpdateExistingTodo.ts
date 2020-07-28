import { Mapper, Todo, StorageErrors } from '../UseCases';
import { Repository } from './types';


type Session = {
  update: Repository<void>;
};

class UpdateExistingTodo implements Mapper<Todo, void> {
  constructor(private session: Session) {}

  async map(todo: Todo): Promise<void | StorageErrors> {
    await this.session.update.load(todo);
  }
}

export {
  UpdateExistingTodo,
  Session,
};
