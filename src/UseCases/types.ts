import { ITodoList, Todo } from '../domain';


type BusinessErrors = 'NotExists' | 'EmptyMessage';
type StorageErrors = 'ServerNotResponded' | 'NotFound' | 'Forbidden';

interface Repository<Context, Result> {
  execute(context: Context): Promise<Result | StorageErrors>;
}

type Result = ITodoList | BusinessErrors | StorageErrors;

interface UseCase<Context> {
  execute(context: Context): Promise<Result>;
}

interface Interceptor {
  values(): Promise<Todo[] | BusinessErrors | StorageErrors>;
}

type Context = any;

type Item = {
  context: Context;
  executor: UseCase<Context>;
};

export {
  BusinessErrors,
  StorageErrors,
  Repository,
  UseCase,
  Item,
  Result,
  Interceptor,
};
