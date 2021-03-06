import { Status, ITodoFactory, Todo } from './types';
import { TodoList, TodoCollection } from './TodoList';


class TodoFactory implements ITodoFactory {
  create() {
    return new TodoList(new TodoCollection(), { indexMap: new Set([]), lastId: '0' });
  }
  hydrate(todos: Array<Todo>) {
    const todoCollection = new TodoCollection();
    const indexMap = new Set([]);
    const todosCount = todos.length - 1;

    todos.forEach((todo, index) => {
      todoCollection.add(todo);
      indexMap.add(todosCount - index);
    });

    return new TodoList(todoCollection, { indexMap, lastId: (todos.length - 1).toString() });
  }
}

export { TodoFactory, Status, Todo };
