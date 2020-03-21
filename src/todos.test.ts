import { TodoFactory, Status } from './todos';

describe('Check todo models', () => {
  test('Todo list is creating', () => {
    const todoList = new TodoFactory().create();

    expect(todoList.length).toBe(0);
  });

  test('If todo list was add, it will global in context factory method', () => {
    const todoList = new TodoFactory().create();
    const todoList1 = todoList.add({ message: '1234' }).add({ message: '5678' });

    expect(todoList.length).toBe(2);
    expect(todoList1.length).toBe(todoList.length);
  });

  test('Todo list is iterable object', () => {
    const todoList = new TodoFactory()
      .create()
      .add({ message: '1234' })
      .add({ message: '5678' });

    const expectedResult = [{
      message: '5678',
      status: Status.New,
    }, {
      message: '1234',
      status: Status.New,
    }];

    expect(Array.from(todoList)).toStrictEqual(expectedResult);
  });

  test('Getting todo element by index', () => {
    const todoList = new TodoFactory()
      .create()
      .add({ message: '1234' })
      .add({ message: '5678' });

    const expectedResult = [{
      message: '1234',
      status: Status.New,
    }];

    expect(Array.from(todoList.at(1))).toStrictEqual(expectedResult);
  });

  test('Remove todo', () => {
    const todoList = new TodoFactory()
      .create()
      .add({ message: '1234' })
      .add({ message: '5678' })
      .add({ message: 'qwerty' });

    const expectedResult = [{
      message: 'qwerty',
      status: Status.New,
    }, {
      message: '1234',
      status: Status.New,
    }];
    
    const todoList1 = todoList.at(1).remove();

    expect(Array.from(todoList)).toStrictEqual(expectedResult);
    expect(todoList1.length).toBe(0);
  });

  test('Mark todo as complete', () => {
    const todoList = new TodoFactory()
      .create()
      .add({ message: '1234' })
      // .add({ message: '5678' })
      // .add({ message: 'qwerty' })
      .add({ message: 'asdf' });

    const expectedResult = [{
      message: '1234',
      status: Status.Completed,
    }];

    const completedTodo = todoList.at(1).markAsCompleted();
    const collection = Array.from(todoList);

    expect(Array.from(completedTodo)).toStrictEqual(expectedResult);
    expect(collection[0].status).toStrictEqual(Status.New);
    expect(collection[1].status).toStrictEqual(Status.Completed);
  });
});
