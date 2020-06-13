import { TodoFactory, Status } from '../domain';
import { TodoInterceptor } from './index';


describe('Testing Todo UseCase', () => {
  test('Testing minimalistic call', async () => {
    const todoList = new TodoFactory().create();
    const todos = new TodoInterceptor(todoList);
    const result = await todos.values();

    expect(result).toStrictEqual([]);
  });

  test('Testing creating list', async () => {
    const todoList = new TodoFactory().create();
    const todos = new TodoInterceptor(todoList);
    
    await todos.create({ message: 'qwerty' }).values();

    expect(Array.from(todoList)).toStrictEqual([{
      id: '1',
      message: 'qwerty',
      status: Status.New,
    }]);
  });

  test('Testing creating some items', async () => {
    const todoList = new TodoFactory().create();
    const todos = new TodoInterceptor(todoList);
    
    await todos
      .create({ message: 'qwerty' })
      .create({ message: '12345' })
      .create({ message: '67890' })
      .values();

    expect(Array.from(todoList)).toStrictEqual([{
      id: '3',
      message: 'qwerty',
      status: Status.New,
    }, {
      id: '2',
      message: '12345',
      status: Status.New,
    }, {
      id: '1',
      message: '67890',
      status: Status.New,
    }]);
  });

  test('Testing interrupt after invalid data', async () => {
    const todoList = new TodoFactory().create();
    const todos = new TodoInterceptor(todoList);
    
    try {
      await todos
        .create({ message: 'qwerty' })
        .create({ message: '' })
        .create({ message: '67890' })
        .values();
    } catch (e) {
      expect(e).toBe('EmptyMessage');
    }
  });
});
