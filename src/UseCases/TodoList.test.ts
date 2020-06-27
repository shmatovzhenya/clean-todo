import { TodoFactory, Status } from '../domain';
import { TodoList } from './TodoList';
import { UseCaseErrors } from './types';


describe('Testing TodoList UseCase', () => {
  test('Creating array of todos', async () => {
    const todos = new TodoFactory().create();
    const todoList = new TodoList(todos, {
      save: {
        map: async () => {},
      },
    });

    const result = await todoList
      .create({ message: 'qwerty' })
      .create({ message: 'asdfgh' })
      .create({ message: 'zxcvbn' })
      .values();

    expect(result).toStrictEqual([
      { id: '3', message: 'qwerty', status: Status.New }, 
      { id: '2', message: 'asdfgh', status: Status.New }, 
      { id: '1', message: 'zxcvbn', status: Status.New },
    ]);
  });

  test('Try to create todo with empty message', async () => {
    const todos = new TodoFactory().create();
    const todoList = new TodoList(todos, {
      save: {
        map: async () => {},
      },
    });

    const result = await todoList
      .create({ message: '' })
      .create({ message: 'asdfgh' })
      .create({ message: 'zxcvbn' })
      .values();

    expect(result).toStrictEqual({
      code: UseCaseErrors.EmptyValue,
      context: {
        message: '',
      },
      name: 'create',
    });
  });

  test('Concat values', async () => {
    const todos = new TodoFactory().create();
    const todoList = new TodoList(todos, {
      save: {
        map: async () => {},
      },
    });

    await todoList
      .create({ message: 'qwerty' })
      .create({ message: 'asdfgh' })
      .create({ message: 'zxcvbn' })
      .values();
    
    const result = await todoList.getById({ id: '3' }).concat({ id: '1' }).values();
    console.log(result);

    expect(result).toStrictEqual([
      { id: '1', message: 'zxcvbn', status: Status.New },        
      { id: '3', message: 'qwerty', status: Status.New },
    ]);
  });
});
