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
  const updatedTodos = todos.add({ message: '123' });
  const result = [];
  const expectedResult: Array<Todo> = [{ message: '123', status: Status.New }];

  for (let todo of updatedTodos) {
    result.push(todo);
  }

  expect(result).toStrictEqual(expectedResult);
});
