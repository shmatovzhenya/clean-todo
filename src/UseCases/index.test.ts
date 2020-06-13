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
});
