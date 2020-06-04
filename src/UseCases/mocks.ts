import { Todo } from '../domain';
import { Repository } from './types';

class FakeGetTodoRepository implements Repository<void, Todo[]> {
  async execute(): Promise<Todo[]> {
    return [];
  }
}

class FakePutTodoRepository implements Repository<Todo, void> {
  async execute(_: Todo | Todo[]): Promise<void> {}
}

export {
  FakeGetTodoRepository,
  FakePutTodoRepository,
};
