import { TodoFactory, Status, Todo } from '../domain';
import * as mocks from './mocks';
import { TODO_LIST } from './fixtures';
import { MarkTodosAsCompleted } from './MarkTodosAsCompleted';


jest.mock('./mocks');

describe('Tests for MarkTodoAsCompleted', () => {
  test('Without params, all todos mark as completed', async () => {
    const fakeRepositories = mocks as jest.Mocked<typeof mocks>;
    const callback = jest.fn();

    fakeRepositories.FakePutTodoRepository.prototype.execute.mockImplementationOnce(callback);

    const mockedRepository = new mocks.FakePutTodoRepository();

    const receivedValue: Todo[] = TODO_LIST.map(todo => ({
      id: todo.id,
      message: todo.message,
      status: Status.Completed,
    }));

    const markTodosAsCompleted = new MarkTodosAsCompleted(
      mockedRepository, new TodoFactory().hydrate(JSON.parse(JSON.stringify(TODO_LIST))),
    );

    const result = await markTodosAsCompleted.execute();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(receivedValue);
    expect(result).toStrictEqual(receivedValue);
  });

  test('If status param is defined then mark all todos in this status as completed', async () => {
    const fakeRepositories = mocks as jest.Mocked<typeof mocks>;
    const callback = jest.fn();

    fakeRepositories.FakePutTodoRepository.prototype.execute.mockImplementationOnce(callback);

    const mockedRepository = new mocks.FakePutTodoRepository();

    const receivedValue: Todo[] = TODO_LIST.map(todo => ({
      id: todo.id,
      message: todo.message,
      status: Status.Completed,
    }));

    const markTodosAsCompleted = new MarkTodosAsCompleted(
      mockedRepository, new TodoFactory().hydrate(JSON.parse(JSON.stringify(TODO_LIST))),
    );

    const result = await markTodosAsCompleted.execute({ status: Status.New });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(receivedValue);
    expect(result).toStrictEqual(receivedValue);
  });

  test('If status param is completed then result not changed', async () => {
    const fakeRepositories = mocks as jest.Mocked<typeof mocks>;
    const callback = jest.fn();

    fakeRepositories.FakePutTodoRepository.prototype.execute.mockImplementationOnce(callback);

    const mockedRepository = new mocks.FakePutTodoRepository();

    const markTodosAsCompleted = new MarkTodosAsCompleted(
      mockedRepository, new TodoFactory().hydrate(JSON.parse(JSON.stringify(TODO_LIST))),
    );

    const receivedValue = TODO_LIST.filter(todo => todo.status === Status.Completed);
    const result = await markTodosAsCompleted.execute({ status: Status.Completed });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(receivedValue);
    expect(result).toStrictEqual(TODO_LIST);
  });

  test('If only number param is defined then change status by index in common list', async () => {
    const fakeRepositories = mocks as jest.Mocked<typeof mocks>;
    const callback = jest.fn();
    console.log('START');

    fakeRepositories.FakePutTodoRepository.prototype.execute.mockImplementationOnce(callback);

    const mockedRepository = new mocks.FakePutTodoRepository();

    const markTodosAsCompleted = new MarkTodosAsCompleted(
      mockedRepository, new TodoFactory().hydrate(JSON.parse(JSON.stringify(TODO_LIST))),
    );

    const receivedValue = TODO_LIST[3];
    const result = await markTodosAsCompleted.execute({ index: 3 });
    const receivedResult = JSON.parse(JSON.stringify(TODO_LIST));

    receivedResult[3].status = Status.Completed;
    receivedValue.status = Status.Completed;

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith([receivedValue]);
    expect(result).toStrictEqual(receivedResult);
  });
});
