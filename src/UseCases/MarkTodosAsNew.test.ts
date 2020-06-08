import { TodoFactory, Status, Todo } from '../domain';
import * as mocks from './mocks';
import { TODO_LIST } from './fixtures';
import { MarkTodosAsNew } from './MarkTodosAsNew';
import { Errors } from './types';


jest.mock('./mocks');

describe('Tests for MarkTodoAsNew', () => {
  test('Without params, all todos mark as new', async () => {
    const fakeRepositories = mocks as jest.Mocked<typeof mocks>;
    const callback = jest.fn();

    fakeRepositories.FakePutTodoRepository.prototype.execute.mockImplementationOnce(callback);

    const mockedRepository = new mocks.FakePutTodoRepository();

    const receivedValue: Todo[] = TODO_LIST.map(todo => ({
      id: todo.id,
      message: todo.message,
      status: Status.New,
    }));

    const markTodosAsNew = new MarkTodosAsNew(
      mockedRepository, new TodoFactory().hydrate(JSON.parse(JSON.stringify(TODO_LIST))),
    );

    const result = await markTodosAsNew.execute();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(receivedValue);
    expect(result).toStrictEqual(receivedValue);
  });

  test('If status param is defined then mark all todos in this status as new', async () => {
    const fakeRepositories = mocks as jest.Mocked<typeof mocks>;
    const callback = jest.fn();

    fakeRepositories.FakePutTodoRepository.prototype.execute.mockImplementationOnce(callback);

    const mockedRepository = new mocks.FakePutTodoRepository();

    const receivedValue: Todo[] = TODO_LIST.map(todo => ({
      id: todo.id,
      message: todo.message,
      status: Status.New,
    }));

    const calledValue: Todo[] = TODO_LIST.filter(todo => todo.status === Status.Completed).map(todo => ({
      id: todo.id,
      message: todo.message,
      status: Status.New,
    }));

    const markTodosAsNew = new MarkTodosAsNew(
      mockedRepository, new TodoFactory().hydrate(JSON.parse(JSON.stringify(TODO_LIST))),
    );

    const result = await markTodosAsNew.execute({ status: Status.Completed });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(calledValue);
    expect(result).toStrictEqual(receivedValue);
  });

  test('If status param is new then result not changed', async () => {
    const fakeRepositories = mocks as jest.Mocked<typeof mocks>;
    const callback = jest.fn();

    fakeRepositories.FakePutTodoRepository.prototype.execute.mockImplementationOnce(callback);

    const mockedRepository = new mocks.FakePutTodoRepository();

    const markTodosAsNew = new MarkTodosAsNew(
      mockedRepository, new TodoFactory().hydrate(JSON.parse(JSON.stringify(TODO_LIST))),
    );

    const receivedValue = TODO_LIST.filter(todo => todo.status === Status.New);
    const result = await markTodosAsNew.execute({ status: Status.New });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(receivedValue);
    expect(result).toStrictEqual(TODO_LIST);
  });

  test('If only number param is defined then change status by index in common list', async () => {
    const fakeRepositories = mocks as jest.Mocked<typeof mocks>;
    const callback = jest.fn();

    fakeRepositories.FakePutTodoRepository.prototype.execute.mockImplementationOnce(callback);

    const mockedRepository = new mocks.FakePutTodoRepository();

    const markTodosAsNew = new MarkTodosAsNew(
      mockedRepository, new TodoFactory().hydrate(JSON.parse(JSON.stringify(TODO_LIST))),
    );

    const receivedValue = TODO_LIST[3];
    const result = await markTodosAsNew.execute({ index: 3 });
    const receivedResult = JSON.parse(JSON.stringify(TODO_LIST));

    receivedResult[3].status = Status.New;
    receivedValue.status = Status.New;

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith([receivedValue]);
    expect(result).toStrictEqual(receivedResult);
  });

  test('Testing behaviour when index is out of range', async () => {
    const fakeRepositories = mocks as jest.Mocked<typeof mocks>;
    const callback = jest.fn();

    fakeRepositories.FakePutTodoRepository.prototype.execute.mockImplementationOnce(callback);

    const mockedRepository = new mocks.FakePutTodoRepository();

    const markTodosAsNew = new MarkTodosAsNew(
      mockedRepository, new TodoFactory().hydrate(JSON.parse(JSON.stringify(TODO_LIST))),
    );

    try {
      await markTodosAsNew.execute({ index: 10 });
    } catch (e) {
      expect(e).toBe(Errors.NotFound);
    }
  });
});
