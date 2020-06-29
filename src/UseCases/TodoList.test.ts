import { TodoFactory, Status } from '../domain';
import { TodoList, Session } from './TodoList';
import { UseCaseErrors, StorageErrors } from './types';


const session: Session = {
  save: {
    map: async () => {},
  },
  update: {
    map: async () => {},
  },
  remove: {
    map: async () => {},
  },
};

describe('Testing TodoList UseCase', () => {
  test('Creating array of todos', async () => {
    const todos = new TodoFactory().create();
    const todoList = new TodoList(todos, session);

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
    const todoList = new TodoList(todos, session);

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
      update: session.update,
      remove: session.remove,
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
    const todoList = new TodoList(todos, session);

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
    const todoList = new TodoList(todos, session);

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
    const todoList = new TodoList(todos, session);

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
    const todoList = new TodoList(todos, session);

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
    const todoList = new TodoList(todos, session);

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

  test('Mark todo as read', async () => {
    const todos = new TodoFactory().create();
    const todoList = new TodoList(todos, session);

    await todoList
      .create({ message: 'qwerty' })
      .create({ message: 'asdfgh' })
      .create({ message: 'zxcvbn' })
      .values();
    
    const result = await todoList
      .getById({ id: '1' })
      .concat({ id: '2' })
      .complete()
      .values();

    expect(Array.from(todos)).toStrictEqual([
      { id: '3', message: 'qwerty', status: 0 }, 
      { id: '2', message: 'asdfgh', status: 1 }, 
      { id: '1', message: 'zxcvbn', status: 1 },
    ]);
  });

  test('Mark todo as read', async () => {
    const todos = new TodoFactory().create();
    const todoList = new TodoList(todos, session);

    await todoList
      .create({ message: 'qwerty' })
      .create({ message: 'asdfgh' })
      .create({ message: 'zxcvbn' })
      .getById({ id: '1' })
      .concat({ id: '2' })
      .complete()
      .values();
    
    expect(Array.from(todos)).toStrictEqual([
      { id: '3', message: 'qwerty', status: 0 }, 
      { id: '2', message: 'asdfgh', status: 1 }, 
      { id: '1', message: 'zxcvbn', status: 1 },
    ]);
  });


  test('Mark todo as read with network error', async () => {
    const todos = new TodoFactory().create();
    const todoList = new TodoList(todos, {
      save: session.save,
      remove: session.remove,
      update: {
        map: async () => Promise.resolve(StorageErrors.NetworkFailed),
      },
    });

    const result = await todoList
      .create({ message: 'qwerty' })
      .create({ message: 'asdfgh' })
      .create({ message: 'zxcvbn' })
      .getById({ id: '1' })
      .concat({ id: '2' })
      .complete()
      .values();
    
    expect(Array.from(todos)).toStrictEqual([
      { id: '3', message: 'qwerty', status: 0 }, 
      { id: '2', message: 'asdfgh', status: 0 }, 
      { id: '1', message: 'zxcvbn', status: 0 },
    ]);

    expect(result).toStrictEqual({
      code: StorageErrors.NetworkFailed,
      context: {},
      name: 'complete',
    });
  });

  test('Mark todo as unread', async () => {
    const todos = new TodoFactory().create();
    const todoList = new TodoList(todos, session);

    await todoList
      .create({ message: 'qwerty' })
      .create({ message: 'asdfgh' })
      .create({ message: 'zxcvbn' })
      .complete()
      .getById({ id: '1' })
      .concat({ id: '2' })
      .markAsNew()
      .values();
    
    expect(Array.from(todos)).toStrictEqual([
      { id: '3', message: 'qwerty', status: 1 }, 
      { id: '2', message: 'asdfgh', status: 0 }, 
      { id: '1', message: 'zxcvbn', status: 0 },
    ]);
  });

  test('Mark todo as read with network error', async () => {
    let isCalled = false;
    const todos = new TodoFactory().create();
    const todoList = new TodoList(todos, {
      save: session.save,
      remove: session.remove,
      update: {
        map: async () => {
          if (!isCalled) {
            isCalled = true;
          } else {
            return StorageErrors.NetworkFailed;
          }
        },
      },
    });

    await todoList
      .create({ message: 'qwerty' })
      .create({ message: 'asdfgh' })
      .create({ message: 'zxcvbn' })
      .complete()
      .values();

    const result = await todoList
      .getById({ id: '1' })
      .concat({ id: '2' })
      .markAsNew()
      .values();
    
    
    expect(Array.from(todos)).toStrictEqual([
      { id: '3', message: 'qwerty', status: 1 }, 
      { id: '2', message: 'asdfgh', status: 1 }, 
      { id: '1', message: 'zxcvbn', status: 1 },
    ]);

    expect(result).toStrictEqual({
      code: StorageErrors.NetworkFailed,
      context: {},
      name: 'unread',
    });
  });

  test('Removing todo', async () => {
    const todos = new TodoFactory().create();
    const todoList = new TodoList(todos, session);

    await todoList
      .create({ message: 'qwerty' })
      .create({ message: 'asdfgh' })
      .create({ message: 'zxcvbn' })
      .getById({ id: '1' })
      .concat({ id: '3' })
      .remove()
      .values();

    expect(Array.from(todos)).toStrictEqual([{ id: '2', message: 'asdfgh', status: 0 }]);
  });

  test('Removing todo', async () => {
    const todos = new TodoFactory().create();
    const todoList = new TodoList(todos, {
      save: session.save,
      update: session.update,
      remove: {
        map: async () => StorageErrors.NetworkFailed,
      },
    });

    const result = await todoList
      .create({ message: 'qwerty' })
      .create({ message: 'asdfgh' })
      .create({ message: 'zxcvbn' })
      .getById({ id: '1' })
      .concat({ id: '3' })
      .remove()
      .values();

    expect(result).toStrictEqual({
      code: StorageErrors.NetworkFailed,
      context: {},
      name: 'remove',
    });
  });

  test('Get todos by status', async () => {
    const todos = new TodoFactory().create();
    const todoList = new TodoList(todos, session);

    await todoList
      .create({ message: 'qwerty' })
      .create({ message: 'asdfgh' })
      .create({ message: 'zxcvbn' })
      .getById({ id: '1' })
      .concat({ id: '3' })
      .complete()
      .values();

    const completed = await todoList.getByStatus({ status: Status.Completed }).values();
    const unCompleted = await todoList.getByStatus({ status: Status.New }).values();

    expect(completed).toStrictEqual([
      { id: '3', message: 'qwerty', status: Status.Completed }, 
      { id: '1', message: 'zxcvbn', status: Status.Completed },
    ]);

    expect(unCompleted).toStrictEqual([
      { id: '2', message: 'asdfgh', status: Status.New }, 
    ]);
  });
});
