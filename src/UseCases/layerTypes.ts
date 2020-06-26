enum StorageErrors {
  NotFound,
  NetworkFailed,
  NotAccess,
  UnknownError,
}

enum UseCaseErrors {
  OutOfRange,
  NotFound,
}

interface Mapper<Context, Result> {
  map(context: Context): Promise<Result | StorageErrors>;
}

interface UseCase<Context, Result> {
  execute(context: Context): Promise<Result | StorageErrors | UseCaseErrors>;
}

export {
  StorageErrors,
  UseCaseErrors,
  Mapper,
  UseCase,
};
