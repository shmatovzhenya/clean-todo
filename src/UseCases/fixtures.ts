import { Todo, Status } from '../domain';


const TODO_LIST: Todo[] = [{
  id: '1',
  message: '1111',
  status: Status.New,
}, {
  id: '2',
  message: '2222',
  status: Status.Completed,
}, {
  id: '3',
  message: '333333',
  status: Status.Completed,
}, {
  id: '4',
  message: '444',
  status: Status.New,
}];

export {
  TODO_LIST,
};
