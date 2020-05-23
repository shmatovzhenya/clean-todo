interface Repository<Context, Result> {
  execute(context: Context): Promise<Result>;
}

enum Errors {
  EmptyMessage,
}

export {
  Repository,
  Errors,
};
