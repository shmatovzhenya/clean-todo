import { StorageErrors, Todo } from '../UseCases';


interface Repository<Result> {
  load(context?: any): Promise<Result | StorageErrors>;
}

interface RepositoriesTree {
  root: Repository<any>;
  context: any;
  children: RepositoriesTree[];
}

interface UnitOfWork<T> {
  registerNew(t: T): void;
  registerDirty(t: T): void;
  registerClean(t: T): void;
  commit(): Promise<void>;
}


export {
  Repository,
  RepositoriesTree,
  UnitOfWork,
};
