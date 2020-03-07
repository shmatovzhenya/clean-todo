enum Status {
  Completed, New,
}

type Todo = {
  message: string;
  status: Status;
}

class Todos {
  constructor(private todos: Array<Todo> = []) {}

  add({ message }: { message: string }): Todos {
    const nextTodo = { message, status: Status.New };
    const list = [ nextTodo ].concat(this.todos);

    return new Todos(list);
  }

  [Symbol.iterator]() {
    return {
      index: 0,
      todos: this.todos,
      next() {
        return {
          done: this.index >= this.todos.length,
          value: this.todos[this.index++],
        };
      },
    };
  }
}

export {
  Status,
  Todo,
  Todos,
};
