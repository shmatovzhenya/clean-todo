interface Repository<Context, Result> {
  execute(context: Context): Promise<Result>;
}

enum Errors {
  EmptyMessage,
  NotFound,
}

export {
  Repository,
  Errors,
};
