
interface IResultSet {
  getNumber(): number;
  getString(): string;
  getBoolean(): boolean;
}

enum OperationStatuses {
  Success,
}

interface IResult {
  status: OperationStatuses;
  body?: IResultSet;
}

interface CreateRepository<Context> {
  create(context: Context): Promise<IResult>;
};

export { IResultSet, OperationStatuses, IResult, CreateRepository };
