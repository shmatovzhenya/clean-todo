enum Status {
  New, Completed,
}

interface Todo {
  id: string;
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
  getById(id: string): ITodoList;
  addToSequence(id: string): ITodoList;
  readonly length: number;
  [Symbol.iterator](): Iterator<Todo>;
}

interface ITodoFactory {
  create(): ITodoList;
}

interface ITodoCollection {
  readonly length: number;
  add(todo: Todo): void;
  remove(index: number): void;
  getById(id: string): {
    index: number;
    data?: Todo;
  };
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
