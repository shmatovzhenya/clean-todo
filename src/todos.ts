enum Status {
  New, Completed,
}

interface Todo {
  message: string;
  status: Status;
}

interface ITodoList {
  add(todo: { message: string }): ITodoList;
  at(index: number): ITodoList;
  remove(): ITodoList;
  readonly length: number;
}

interface ITodoFactory {
  create(): TodoList;
}

interface ITodoCollection {
  readonly length: number;
  add(todo: Todo): void;
  remove(index): void;
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

  remove(index: number): void {
    this.list.splice(index, 1);
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

  at(index: number): TodoList {
    const countOfTodo = this.settings.indexMap.size;
    const settings: TodoSettings = {...this.settings,
      indexMap: new Set([ countOfTodo - 1 - index ]),
    };

    return new TodoList(this.todoList, settings);
  }

  remove(): TodoList {
    for (let index of this.settings.indexMap) {
      this.todoList.remove(index);
      this.settings.indexMap.delete(index);
    }

    return new TodoList(this.todoList, this.settings);
  }

  private collectionSize(): number {
    const collectionSize = Math.min(
      this.settings.indexMap.size,
      this.todoList.length,
    );

    return collectionSize;
  }

  get length() {
    return this.collectionSize();
  }

  [Symbol.iterator]() {
    const todoListSize = this.todoList.length;

    const indexMap = Array.from(this.settings.indexMap)
      .reverse()
      .filter(storedIndex => storedIndex < todoListSize)
      .slice(0, this.collectionSize());

    return {
      index: 0,
      todoList: this.todoList,
      settings: {...this.settings, indexMap },
      next() {
        const countOfTodo = this.settings.indexMap.length;
        const currentPosition = this.settings.indexMap[this.index++];
        const isOutOfRange = this.index > countOfTodo;

        return {
          done: isOutOfRange,
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