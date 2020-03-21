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
  markAsCompleted(): ITodoList;
  markAsNew(): ITodoList;
  findByStatus(status: Status): ITodoList;
  readonly length: number;
}

interface ITodoFactory {
  create(): ITodoList;
}

interface ITodoCollection {
  readonly length: number;
  add(todo: Todo): void;
  remove(index): void;
  at(index: number): Todo;
  updateStatus(index: number, status: Status): void;
}

export {
  ITodoCollection,
  ITodoList,
  ITodoFactory,
  Status,
  Todo,
};
