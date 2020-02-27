import { OperationStatuses, CreateRepository, IResult } from '../declarations';
import { CreateTodo, TodoContext } from './CreateTodo';


class MockedRepository implements CreateRepository<TodoContext> {
  async create(context: TodoContext): Promise<IResult> {
    return { status: OperationStatuses.Success };
  }
}

test('creating todo', async () => {
  const repository = new MockedRepository();
  const createTodo = new CreateTodo(repository);
  const context: TodoContext= { message: '123' };
  const realAnswer = await createTodo.execute(context);
  const expectedAnswer: IResult = { status: OperationStatuses.Success };

  expect(realAnswer).toStrictEqual(expectedAnswer);
});
