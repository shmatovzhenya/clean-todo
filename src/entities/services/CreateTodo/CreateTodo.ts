import { CreateRepository, IResult } from '../declarations';

type TodoContext = {
  message: string;
};

class CreateTodo {
  constructor(private repository: CreateRepository<TodoContext>) {}

  async execute(context: TodoContext): Promise<IResult> {
    return await this.repository.create(context);
  }
}

export { TodoContext, CreateTodo };
