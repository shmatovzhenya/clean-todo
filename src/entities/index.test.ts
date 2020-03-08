import { Todos, Todo, Status } from './index';


test('Test iterating todos without errors', () => {
  let counter = 0;
  const todos = new Todos();

  for (let value of todos) {
    counter++;
  }

  expect(counter).toBe(0);
});

test('New todo is added', () => {
  const todos = new Todos();
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
  const todos = new Todos();
  const result = Array.from(
    todos.add({ message: '123' }).add({ message: '345' }).findByIndex(1)
  );

  const expectedResult: Array<Todo> = [{
    message: '123',
    status: Status.New,
  }];

  expect(result).toStrictEqual(expectedResult);
});

test('Mark feed as read', () => {
  const todos = new Todos();
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
