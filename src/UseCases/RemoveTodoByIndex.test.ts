import { RemoveTodoByIndex } from './RemoveTodoByIndex';
import * as mocks from './mocks';
import { TODO_LIST } from './fixtures';
import { TodoFactory } from '../domain';
import { Errors } from './types';


jest.mock('./mocks');

describe('Testing RemoveTodoByIndex', () => {
  test('Testing removing single todo', async () => {
    const fakeRepositories = mocks as jest.Mocked<typeof mocks>;
    const callback = jest.fn();

    fakeRepositories.FakePutTodoRepository.prototype.execute.mockImplementationOnce(callback);

    const mockedRepository = new mocks.FakePutTodoRepository();

    const removeTodoByIndex = new RemoveTodoByIndex(
      mockedRepository,
      new TodoFactory().hydrate(JSON.parse(JSON.stringify(TODO_LIST))),
    );

    const result = await removeTodoByIndex.execute({ index: 0 });
    const expectedValue = TODO_LIST.slice(1);

    expect(result).toStrictEqual(expectedValue);
  });

  test('Testing removing out of range element', async () => {
    const fakeRepositories = mocks as jest.Mocked<typeof mocks>;
    const callback = jest.fn();

    fakeRepositories.FakePutTodoRepository.prototype.execute.mockImplementationOnce(callback);

    const mockedRepository = new mocks.FakePutTodoRepository();

    const removeTodoByIndex = new RemoveTodoByIndex(
      mockedRepository,
      new TodoFactory().hydrate(JSON.parse(JSON.stringify(TODO_LIST))),
    );

    try {
      await removeTodoByIndex.execute({ index: 12355 });
    } catch (e) {
      expect(e).toBe(Errors.NotFound);
    }
  });
});
