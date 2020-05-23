import { Todo, Status, ITodoList } from '../domain';
import { RestoreTodoList } from './RestoreTodoList';
import * as mocks from './mocks';


jest.mock('./mocks');

describe('Testing of restoring todo list', () => {
  test('Testing hydratation from valid list', async () => {
    const fakeRepositories = mocks as jest.Mocked<typeof mocks>;
    const expectedResult: Todo[] = [{
      id: '1',
      message: '111111',
      status: Status.Completed,
    }, {
      id: '3',
      message: '33333',
      status: Status.New,
    }, {
      id: '4',
      message: '44444444',
      status: Status.Completed,
    }];

    fakeRepositories.FakeGetTodoRepository.prototype.execute.mockReturnValueOnce(
      Promise.resolve(expectedResult),
    );

    const restoreTodoList = new RestoreTodoList(new mocks.FakeGetTodoRepository());
    const todoList: ITodoList = await restoreTodoList.execute();
    const receivedResult = Array.from(todoList);

    expect(receivedResult).toStrictEqual(expectedResult);
  });
});
