// import { Todo } from '../domain';
// import { Repository } from './types';


// type TodoAction = {
//   todo: Todo;
//   repository: Repository<any>;
//   action: 'CREATE' | 'UPDATE' | 'DELETE';
// };

// type Actions = {
//   todo: Todo;
//   repository: Repository<any>;
// }[][];

// class UnitOfWorkTodo {
//   private todos: Record<string, TodoAction[]> = {};

//   registerNew(todo: Todo, repository: Repository<any>): void {
//     if (!(todo.id in this.todos)) {
//       this.todos[todo.id] = [];
//     }

//     this.todos[todo.id].push({
//       todo, repository,
//       action: 'CREATE',
//     });
//   }

//   registerDirty(todo: Todo, repository: Repository<any>): void {
//     if (!(todo.id in this.todos)) {
//       this.todos[todo.id] = [];
//     }

//     this.todos[todo.id].push({
//       todo, repository,
//       action: 'UPDATE',
//     });
//   }

//   registerClean(todo: Todo, repository: Repository<any>): void {
//     if (!(todo.id in this.todos)) {
//       this.todos[todo.id] = [];
//     }

//     this.todos[todo.id].push({
//       todo, repository,
//       action: 'DELETE',
//     });
//   }

//   private _prepareRequestTree(): Record<string, TodoAction[]> {
//     const requestQueue: Record<string, TodoAction[]> = {};

//     Object.keys(this.todos).forEach(id => {
//       if (!(id in requestQueue)) {
//         requestQueue[id] = [];
//       }

//       for (let todo of this.todos[id]) {
//         if (todo.action === 'CREATE') {
//           requestQueue[id] = [todo];
//         }

//         if (todo.action === 'UPDATE') {
//           const prev = requestQueue[id][requestQueue[id].length - 1];

//           if (prev.action === 'UPDATE') {
//             requestQueue[id] = requestQueue[id].slice(0, -1);
//             requestQueue[id].push(todo);
//           }

//           if (prev.action === 'CREATE') {
//             requestQueue[id] = requestQueue[id].slice(0, -1);
//             requestQueue[id].push({
//               todo: todo.todo,
//               repository: todo.repository,
//               action: 'CREATE',
//             });
//           }
//         }

//         if (todo.action === 'DELETE') {
//           if (!!this.todos[id].find(todo => todo.action === 'CREATE')) {
//             requestQueue[id] = [];
//           } else {
//             requestQueue[id] = [todo];
//           }
//         }
//       }
//     });

//     return requestQueue;
//   }

//   private _mapOrder(requestQueue: Record<string, TodoAction[]>): Actions {
//     const maxLength = Math.max(...Object.values(requestQueue).map(value => value.length));
//     const result: Actions = [...Array(maxLength)].map((_, index) => {
//       return Object
//         .values(requestQueue)
//         .filter(actions => !!actions[index])
//         .map(actions => {
//           const { todo, repository } = actions[index];

//           return { todo, repository };
//         });
//     })

//     return result;
//   }

//   async commit(): Promise<void> {
//     const requestQueue: Record<string, TodoAction[]> = this._prepareRequestTree();
//     const orderingQueue: Actions = this._mapOrder(requestQueue);

//     for (let items of orderingQueue) {
//       const requests = items.map(item => item.repository.load(item.todo));

//       await Promise.all(requests);
//     }
//   }
// }

// export {
//   UnitOfWorkTodo,
// };
