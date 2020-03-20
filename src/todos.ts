interface Todo {
  message: string;
}

interface ITodoList {
  add(options: Todo): ITodoList;
  readonly length: number;
}

interface ITodoFactory {
  create(): TodoList;
}

interface ITodoCollection {
  readonly length: number;
  add(todo: Todo): void;
}

class TodoCollection implements ITodoCollection {
  private list: Array<Todo> = [];

  add(todo: Todo): void {
    this.list.push(todo);
  }

  get length(): number {
    return this.list.length;
  }
}

class TodoList implements ITodoList {
  constructor(private todoList: ITodoCollection) {}

  add(todo: Todo): TodoList {
    this.todoList.add(todo);
    return new TodoList(this.todoList);
  }

  get length() {
    return this.todoList.length;
  }
}

class TodoFactory implements ITodoFactory {
  create() {
    return new TodoList(new TodoCollection());
  }
}

export { TodoFactory };
