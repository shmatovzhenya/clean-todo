import { TodoFactory, Status, Todo } from './index';

describe('Check todo models', () => {
  test('Todo list is creating', () => {
    const todoList = new TodoFactory().create();

    expect(todoList.length).toBe(0);
  });

  test('Todo list is created from list of objects', () => {
    const expectedResult: Todo[] = [{
      id: '1',
      message: '5678',
      status: Status.New,
    }, {
      id: '2',
      message: '1234',
      status: Status.New,
    }];

    const todoList = new TodoFactory().hydrate(expectedResult);

    expect(Array.from(todoList)).toStrictEqual(expectedResult);
  });

  test('Testing getting element by id on existing element', () => {
    const todoList = new TodoFactory()
      .create()
      .add({ message: '1234' })
      .add({ message: '5678' });

    const [ todo ] = Array.from(todoList.getById('2'));

    expect(todo).toStrictEqual({
      id: '2',
      message: '5678',
      status: Status.New,
    });
  });

  test('Testing getting element by id on unexisting element', () => {
    const todoList = new TodoFactory()
      .create()
      .add({ message: '1234' })
      .add({ message: '5678' });

    const [ todo ] = Array.from(todoList.getById('14'));

    expect(todo).toBe(undefined);
  });
  
  test('Testing addition existing element to selected elements', () => {
    const todoList = new TodoFactory()
      .create()
      .add({ message: '1234' })
      .add({ message: '5678' })
      .add({ message: 'qwerty' });

    const result = Array.from(todoList.getById('3').addToSequence('1'));

    expect(result).toStrictEqual([{
      id: '1',
      message: '1234',
      status: Status.New,
    }, {
      id: '3',
      message: 'qwerty',
      status: Status.New,
    }]);
  });
  
  test('Testing addition unexisting element to selected elements', () => {
    const todoList = new TodoFactory()
      .create()
      .add({ message: '1234' })
      .add({ message: '5678' })
      .add({ message: 'qwerty' });

    const result = Array.from(todoList.getById('15').addToSequence('1'));

    expect(result).toStrictEqual([{
      id: '1',
      message: '1234',
      status: Status.New,
    }]);
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

    const expectedResult: Todo[] = [{
      id: '2',
      message: '5678',
      status: Status.New,
    }, {
      id: '1',
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

    const expectedResult: Todo[] = [{
      id: '1',
      message: '1234',
      status: Status.New,
    }];

    expect(Array.from(todoList.at(1))).toStrictEqual(expectedResult);
  });

  test('Try to get todo by out of range index', () => {
    const todoList = new TodoFactory()
      .create()
      .add({ message: '1234' })
      .add({ message: '5678' });

    const expectedResult: Todo[] = [];

    expect(Array.from(todoList.at(15))).toStrictEqual(expectedResult);
  });

  test('Remove todo', () => {
    const todoList = new TodoFactory()
      .create()
      .add({ message: '1234' })
      .add({ message: '5678' })
      .add({ message: 'qwerty' });

    const expectedResult: Todo[] = [{
      id: '3',
      message: 'qwerty',
      status: Status.New,
    }, {
      id: '1',
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
      .add({ message: 'asdf' });

    const expectedResult: Todo[] = [{
      id: '1',
      message: '1234',
      status: Status.Completed,
    }];

    const completedTodo = todoList.at(1).markAsCompleted();
    const collection = Array.from(todoList);

    expect(Array.from(completedTodo)).toStrictEqual(expectedResult);
    expect(collection[0].status).toStrictEqual(Status.New);
    expect(collection[1].status).toStrictEqual(Status.Completed);
  });

  test('Get todo list by status', () => {
    const todoList = new TodoFactory()
      .create()
      .add({ message: '1234' })
      .add({ message: '5678' })
      .add({ message: 'qwerty' })
      .add({ message: 'asdf' });

    todoList.at(1).markAsCompleted();
    todoList.at(2).markAsCompleted();

    const expectedResult: Todo[] = [{
      id: '4',
      message: 'asdf',
      status: Status.New,
    }, {
      id: '1',
      message: '1234',
      status: Status.New,
    }];

    const expectedResult1: Todo[] = [{
      id: '3',
      message: 'qwerty',
      status: Status.Completed,
    }, {
      id: '2',
      message: '5678',
      status: Status.Completed,
    }];

    expect(Array.from(todoList.findByStatus(Status.New))).toStrictEqual(expectedResult);
    expect(Array.from(todoList.findByStatus(Status.Completed))).toStrictEqual(expectedResult1);
  });

  test('Mark todo as new', () => {
    const todoList = new TodoFactory()
      .create()
      .add({ message: '1234' })
      .add({ message: '5678' })
      .add({ message: 'qwerty' })
      .add({ message: 'asdf' })
      .markAsCompleted();

    todoList.at(1).markAsNew();
    todoList.at(2).markAsNew();

    const expectedResult: Todo[] = [{
      id: '4',
      message: 'asdf',
      status: Status.Completed,
    }, {
      id: '1',
      message: '1234',
      status: Status.Completed,
    }];

    const expectedResult1: Todo[] = [{
      id: '3',
      message: 'qwerty',
      status: Status.New,
    }, {
      id: '2',
      message: '5678',
      status: Status.New,
    }];

    expect(Array.from(todoList.findByStatus(Status.Completed))).toStrictEqual(expectedResult);
    expect(Array.from(todoList.findByStatus(Status.New))).toStrictEqual(expectedResult1);
  });
});
