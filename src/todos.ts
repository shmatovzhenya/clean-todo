enum Status {
  New, Completed,
}

interface Todo {
  message: string;
  status: Status;
}

interface ITodoList {
  add(todo: { message: string }): ITodoList;
  readonly length: number;
}

interface ITodoFactory {
  create(): TodoList;
}

interface ITodoCollection {
  readonly length: number;
  add(todo: Todo): void;
  at(index: number): Todo;
}

class TodoCollection implements ITodoCollection {
  private list: Array<Todo> = [];

  add(todo: Todo): void {
    this.list.push(todo);
  }

  at(index: number): Todo {
    return this.list[index];
  }

  get length(): number {
    return this.list.length;
  }
}

interface TodoSettings {
  indexMap: Set<number>;
}

class TodoList implements ITodoList {
  constructor(private todoList: ITodoCollection, private settings: TodoSettings) {}

  add(todo: { message: string }): TodoList {
    this.settings.indexMap.add(this.settings.indexMap.size);
    this.todoList.add({
      message: todo.message,
      status: Status.New,
    });

    return new TodoList(this.todoList, this.settings);
  }

  get length() {
    return this.todoList.length;
  }

  [Symbol.iterator]() {
    const indexMap = Array.from(this.settings.indexMap).reverse();

    return {
      index: 0,
      todoList: this.todoList,
      settings: {...this.settings, indexMap },
      next() {
        const countOfTodo = this.settings.indexMap.length;
        const currentPosition = this.settings.indexMap[this.index];

        this.index++;

        return {
          done: this.index > countOfTodo,
          value: this.todoList.at(currentPosition),
        };
      },
    };
  }
}

class TodoFactory implements ITodoFactory {
  create() {
    return new TodoList(new TodoCollection(), { indexMap: new Set([]) });
  }
}

export { TodoFactory, Status };
