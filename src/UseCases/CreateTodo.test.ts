import { CreateTodo } from './CreateTodo';
import { TodoFactory, Status } from '../domain';
import * as mocks from './mocks';
import { Errors } from './types';


jest.mock('./mocks');

describe('Testing CreateTodo Use Case', () => {
  test('Testing creating valid todo', async () => {
    const fakeRepositories = mocks as jest.Mocked<typeof mocks>;
    const callback = jest.fn();

    fakeRepositories.FakePutTodoRepository.prototype.execute.mockImplementationOnce(callback);

    const mockedRepository = new mocks.FakePutTodoRepository();
    const createTodo = new CreateTodo(mockedRepository, new TodoFactory().create());

    await createTodo.execute('1234');

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({
      id: '1',
      message: '1234',
      status: Status.New,
    });    
  });

  test('Testing attempt for creating invalid todo', async () => {
    const fakeRepositories = mocks as jest.Mocked<typeof mocks>;
    const callback = jest.fn();

    fakeRepositories.FakePutTodoRepository.prototype.execute.mockImplementationOnce(callback);

    const mockedRepository = new mocks.FakePutTodoRepository();
    const createTodo = new CreateTodo(mockedRepository, new TodoFactory().create());
    let result: Errors;

    try {
      await createTodo.execute('');
    } catch (e) {
      expect(e).toBe(Errors.EmptyMessage);
    }

    expect(callback).toHaveBeenCalledTimes(0);
  });
});
