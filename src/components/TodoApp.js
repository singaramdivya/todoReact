import React, { Component } from 'react';
import './TodoApp.css'; // Import CSS file

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todos: []
    };
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { inputValue } = this.state;
    const regex = /(.+)\s(\d+)/;
    const match = inputValue.match(regex);

    if (match) {
      const task = match[1];
      const count = parseInt(match[2], 10);

      const newTodos = Array.from({ length: count }, (_, index) => ({
        id: Date.now() + index,
        task,
        count,
        updateCount: 0
      }));

      this.setState((prevState) => ({
        todos: [...prevState.todos, ...newTodos],
        inputValue: ''
      }));
    } else {
      this.setState((prevState) => ({
        todos: [...prevState.todos, { id: Date.now(), task: inputValue, updateCount: 0 }],
        inputValue: ''
      }));
    }
  }

  handleDelete = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter(todo => todo.id !== id)
    }));
  }

  handleEdit = (id, task) => {
    const editedTask = prompt('Edit Task:', task);
    if (editedTask !== null) {
      const { todos } = this.state;
      const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            task: editedTask,
            updateCount: todo.updateCount + 1
          };
        }
        return todo;
      });
      this.setState({ todos: updatedTodos });
    }
  }

  render() {
    const { inputValue, todos } = this.state;

    return (
      <div className="todo-container">
        <h1>Day Goals!</h1>
        <form className="form-container" onSubmit={this.handleSubmit}>
          <input
            className="todo-input"
            type="text"
            value={inputValue}
            onChange={this.handleChange}
            placeholder="Add Todo"
          />
          <button className="todo-button" type="submit">Add Todo</button>
        </form>
        <ul className='list-container'>
            {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
                <p>{todo.task} (Changed {todo.updateCount} times)</p>
                <button className="todo-button" onClick={() => this.handleEdit(todo.id, todo.task)}>Edit</button>
                <button className="todo-button" onClick={() => this.handleDelete(todo.id)}>Delete</button>
            </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default TodoApp;










// import React, { Component } from 'react';

// class TodoApp extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputValue: '',
//       todos: []
//     };
//   }

//   handleChange = (event) => {
//     this.setState({ inputValue: event.target.value });
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();
//     const { inputValue, todos } = this.state;
//     const regex = /(.+)\s(\d+)/;
//     const match = inputValue.match(regex);

//     if (match) {
//       const task = match[1];
//       const count = parseInt(match[2], 10);

//       const newTodos = Array.from({ length: count }, (_, index) => ({
//         id: Date.now() + index,
//         task,
//         count,
//         updatedCount: 0
//       }));

//       this.setState((prevState) => ({
//         todos: [...prevState.todos, ...newTodos],
//         inputValue: ''
//       }));
//     } else {
//       this.setState((prevState) => ({
//         todos: [...prevState.todos, { id: Date.now(), task: inputValue, updatedCount: 0 }],
//         inputValue: ''
//       }));
//     }
//   }

//   handleDelete = (id) => {
//     this.setState((prevState) => ({
//       todos: prevState.todos.filter(todo => todo.id !== id)
//     }));
//   }

//   handleEdit = (id) => {
//     // Logic for editing task can be added here
//     console.log("Edit task with id:", id);
//   }

//   handleUpdate = (id) => {
//     this.setState((prevState) => ({
//       todos: prevState.todos.map(todo => {
//         if (todo.id === id) {
//           return { ...todo, updatedCount: todo.updatedCount + 1 };
//         }
//         return todo;
//       })
//     }));
//   }

//   render() {
//     const { inputValue, todos } = this.state;

//     let placeholder = "Add Todo";
//     if (todos.length > 0 && todos[todos.length - 1].count) {
//       placeholder = `${todos[todos.length - 1].task} ${todos[todos.length - 1].count}`;
//     }

//     return (
//       <div>
//         <h1>Day Goals!</h1>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={this.handleChange}
//           placeholder={placeholder}
//         />
//         <button onClick={this.handleSubmit}>Add Todo</button>
//         <ul>
//           {todos.map((todo) => (
//             <li key={todo.id}>
//               {todo.task} (Updated {todo.updatedCount} times)
//               <button onClick={() => this.handleEdit(todo.id)}>Edit</button>
//               <button onClick={() => this.handleDelete(todo.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default TodoApp;














// import React, { Component } from 'react';

// class TodoApp extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputValue: '',
//       todos: {},
//       updates: {}
//     };
//   }

//   handleChange = (event) => {
//     this.setState({ inputValue: event.target.value });
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();
//     const { inputValue, todos } = this.state;
//     const regex = /(.+)\s(\d+)/;
//     const match = inputValue.match(regex);

//     if (match) {
//       const task = match[1];
//       const count = parseInt(match[2], 10);
//       this.setState((prevState) => ({
//         todos: {
//           ...prevState.todos,
//           [task]: (prevState.todos[task] || 0) + count
//         },
//         updates: {
//           ...prevState.updates,
//           [task]: (prevState.updates[task] || 0)
//         },
//         inputValue: ''
//       }));
//     } else {
//       this.setState((prevState) => ({
//         todos: {
//           ...prevState.todos,
//           [inputValue]: (prevState.todos[inputValue] || 0) + 1
//         },
//         updates: {
//           ...prevState.updates,
//           [inputValue]: (prevState.updates[inputValue] || 0)
//         },
//         inputValue: ''
//       }));
//     }
//   }

//   handleDelete = (task) => {
//     this.setState((prevState) => {
//       const { [task]: deletedTask, ...remainingTodos } = prevState.todos;
//       const { [task]: deletedUpdate, ...remainingUpdates } = prevState.updates;
//       return {
//         todos: remainingTodos,
//         updates: remainingUpdates
//       };
//     });
//   }

//   handleUpdate = (task) => {
//     this.setState((prevState) => ({
//       updates: {
//         ...prevState.updates,
//         [task]: (prevState.updates[task] || 0) + 1
//       }
//     }));
//   }

//   render() {
//     const { inputValue, todos, updates } = this.state;

//     return (
//       <div>
//         <h1>Todo App with a Twist</h1>
//         <form onSubmit={this.handleSubmit}>
//           <input
//             type="text"
//             value={inputValue}
//             onChange={this.handleChange}
//             placeholder={Object.entries(todos).map(([task, count]) => (
//               `${task} (${count})`
//             )).join(', ')}
//           />
//           <button type="submit">Add</button>
//         </form>
//         <ul>
//           {Object.entries(todos).map(([task, count]) => (
//             <li key={task}>
//               {task} (Updated {updates[task] || 0} Times)
//               <button onClick={() => this.handleUpdate(task)}>Edit</button>
//               <button onClick={() => this.handleDelete(task)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default TodoApp;
