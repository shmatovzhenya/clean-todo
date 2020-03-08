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

  findByIndex(index: number): Todos {
    return new Todos([ this.todos[index] ]);
  }

  markAsRead(): Todos {
    const todos = this.todos.map(todo => {
      return {...todo, status: Status.Completed };
    });

    return new Todos(todos);
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
