import { TodoFactory, Status } from '../domain';
import { TodoList } from './TodoList';
import { UseCaseErrors, StorageErrors } from './types';


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

  test('Saving todos by wrong path', async () => {
    const todos = new TodoFactory().create();
    const todoList = new TodoList(todos, {
      save: {
        map: async () => {
          return StorageErrors.NotFound;
        },
      },
    });

    const result = await todoList
      .create({ message: 'qwerty' })
      .create({ message: 'asdfgh' })
      .create({ message: 'zxcvbn' })
      .values();

    expect(result).toStrictEqual({
      code: StorageErrors.NotFound,
      context: {
        message: 'zxcvbn',
      },
      name: 'create',
    });
  });

  test('Concat todos by empty id', async () => {
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
    
    const result = await todoList.getById({ id: '1' }).concat({ id: '' }).values();

    expect(result).toStrictEqual({
      code: UseCaseErrors.EmptyValue,
      context: {
        id: '',
      },
      name: 'concat',
    });
  });

  test('Concat todos by wrong id', async () => {
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
    
    const result = await todoList.getById({ id: '1' }).concat({ id: 'qwertt' }).values();

    expect(result).toStrictEqual({
      code: UseCaseErrors.NotFound,
      context: {
        id: 'qwertt',
      },
      name: 'concat',
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

    expect(result).toStrictEqual([
      { id: '1', message: 'zxcvbn', status: Status.New },        
      { id: '3', message: 'qwerty', status: Status.New },
    ]);
  });

  test('Get todo by empty id', async () => {
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
    
    const result = await todoList.getById({ id: '' }).values();

    expect(result).toStrictEqual({
      code: UseCaseErrors.EmptyValue,
      context: {
        id: '',
      },
      name: 'getById',
    });
  });

  test('Get todo by wrong id', async () => {
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
    
    const result = await todoList.getById({ id: 'qwertt' }).values();

    expect(result).toStrictEqual({
      code: UseCaseErrors.NotFound,
      context: {
        id: 'qwertt',
      },
      name: 'getById',
    });
  });

});
