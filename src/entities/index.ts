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

    this.todos.unshift(nextTodo);

    return new Todos(this.todos);
  }

  findByIndex(index: number): Todos {
    return new Todos([ this.todos[index] ]);
  }

  markAsRead(): Todos {
    for (let todo of this.todos) {
      todo.status = Status.Completed;
    }

    return new Todos(this.todos);
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

const createTodoList = (): Todos => {
  return new Todos([]);
};

export {
  createTodoList,
  Status,
  Todo,
  Todos,
};
