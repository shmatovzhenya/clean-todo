import { TodoFactory, Status, Todo } from '../domain';
import { TodoInterceptor } from './index';


describe('Testing Todo UseCase', () => {
  test('Testing minimalistic call', async () => {
    const todoList = new TodoFactory().create();
    const callback = jest.fn();

    const todos = new TodoInterceptor(todoList, [], {
      createTodoRepository: {
        execute: callback,
      },
    });

    const result = await todos.values();

    expect(result).toStrictEqual([]);
  });

  test('Testing creating list', async () => {
    const todoList = new TodoFactory().create();
    const callback = jest.fn();

    const todos = new TodoInterceptor(todoList, [], {
      createTodoRepository: {
        execute: callback,
      },
    });

    const expectedMessage = {
      id: '1',
      message: 'qwerty',
      status: Status.New,
    };
    
    await todos.create({ message: 'qwerty' }).values();

    expect(Array.from(todoList)).toStrictEqual([ expectedMessage ]);
    expect(callback).toBeCalledWith(expectedMessage);
  });

  test('Testing creating some items', async () => {
    const todoList = new TodoFactory().create();
    const callback = jest.fn();

    const todos = new TodoInterceptor(todoList, [], {
      createTodoRepository: {
        execute: callback,
      },
    });
    
    await todos
      .create({ message: 'qwerty' })
      .create({ message: '12345' })
      .create({ message: '67890' })
      .values();

    expect(Array.from(todoList)).toStrictEqual([{
      id: '3',
      message: '67890',
      status: Status.New,
    }, {
      id: '2',
      message: '12345',
      status: Status.New,
    }, {
      id: '1',
      message: 'qwerty',
      status: Status.New,
    }]);
    expect(callback).toBeCalledTimes(3);
  });

  test('Testing interrupt after invalid data', async () => {
    const todoList = new TodoFactory().create();
    const callback = jest.fn();

    const todos = new TodoInterceptor(todoList, [], {
      createTodoRepository: {
        execute: callback,
      },
    });
    
    try {
      await todos
        .create({ message: 'qwerty' })
        .create({ message: '' })
        .create({ message: '67890' })
        .values();
    } catch (e) {
      expect(e).toBe('EmptyMessage');
    } finally {
      expect(callback).toBeCalledTimes(1);
    }
  });

  // test('Test selecting pair todos', async () => {
  //   const todoList = new TodoFactory().create();
  //   const callback = jest.fn();
  //   console.log('START');

  //   const todos = new TodoInterceptor(todoList, [], {
  //     createTodoRepository: {
  //       execute: callback,
  //     },
  //   });

  //   await todos
  //     .create({ message: 'qwerty' })
  //     .create({ message: '12345' })
  //     .create({ message: '67890' })
  //     .values();

  //   const result = await todos
  //     .getById({ id: '1' })
  //     .concat({ id: '3' })
  //     .values();
  //   console.log({ result });
  //   console.log('END');
    
  //   expect(result).toStrictEqual([{
  //     id: '3',
  //     message: '67890',
  //     status: Status.New,
  //   }, {
  //     id: '1',
  //     message: 'qwerty',
  //     status: Status.New,
  //   }]);
  // });
});
