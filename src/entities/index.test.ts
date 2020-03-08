import { Todos, Todo, Status, createTodoList } from './index';


test('Test iterating todos without errors', () => {
  let counter = 0;
  const todos = createTodoList();

  for (let value of todos) {
    counter++;
  }

  expect(counter).toBe(0);
});

test('New todo is added', () => {
  const todos = createTodoList();
  const result = Array.from(
    todos.add({ message: '123' }).add({ message: '345' })
  );

  const expectedResult: Array<Todo> = [{
    message: '345', status: Status.New,
  }, {
    message: '123', status: Status.New,
  }];


  expect(result).toStrictEqual(expectedResult);
});

test('Get todo by index', () => {
  const todos = createTodoList();
  const result = Array.from(
    todos.add({ message: '123' }).add({ message: '345' }).findByIndex(1)
  );

  const expectedResult: Array<Todo> = [{
    message: '123',
    status: Status.New,
  }];

  expect(result).toStrictEqual(expectedResult);
});

test('Mark all todos as read', () => {
  const todos = createTodoList();
  const result = Array.from(
    todos.add({ message: '123' }).add({ message: '345' }).markAsRead(),
  );

  const expectedResult: Array<Todo> = [{
    message: '345',
    status: Status.Completed,
  }, {
    message: '123',
    status: Status.Completed,
  }];

  expect(result).toStrictEqual(expectedResult);
});

test('Mark one todo as read', () => {
  const todos = createTodoList().add({ message: '123' }).add({ message: '345' });
  const oneResult = Array.from(todos.findByIndex(0).markAsRead());

  expect(oneResult).toStrictEqual([{
    message: '345',
    status: Status.Completed,
  }]);

  expect(Array.from(todos)).toStrictEqual([{
    message: '345',
    status: Status.Completed,
  }, {
    message: '123',
    status: Status.New,
  }]);
});

test('Todos are isolated by root', () => {
  const todos = createTodoList().add({ message: '123' }).add({ message: '345' });
  const todos1 = createTodoList().add({ message: '123' }).add({ message: '345' });
  const oneResult = Array.from(todos.findByIndex(0).markAsRead());

  expect(oneResult).toStrictEqual([{
    message: '345',
    status: Status.Completed,
  }]);

  expect(Array.from(todos)).toStrictEqual([{
    message: '345',
    status: Status.Completed,
  }, {
    message: '123',
    status: Status.New,
  }]);

  expect(Array.from(todos1)).toStrictEqual([{
    message: '345',
    status: Status.New,
  }, {
    message: '123',
    status: Status.New,
  }]);
});
