import React from "react";
import "./App.css";
import TitleBlock from "./pages/TitleBlock";
import Task from './components/Task';

let tags = ['Home', 'School', 'Work'];

// function Todo({ todo, index, completeTodo, removeTodo }) {
//   return (
//     <div
//       className="todo"
//       style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
//     >
//       <div>
//         <button onClick={() => completeTodo(index)}>Completed</button>
//         {/* <button onClick={() => removeTodo(index)}>Remove</button> */}
//       </div>
//       {todo.text}
//     </div>
//   );
// }

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="New task"
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  // const completeTodo = (index) => {
  //   const newTodos = [...todos];
  //   if (!newTodos[index].isCompleted) {
  //     newTodos[index].isCompleted = true;
  //   } else {
  //     newTodos[index].isCompleted = false;
  //   }
  //   setTodos(newTodos);
  // };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <TodoForm addTodo={addTodo} />
      <TitleBlock />
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Task task={
            {
              'id': index,
              'title': todo.text,
              'due_date': 'Jan 30, 2021',
              'tags': [
                {
                  'title': tags[Math.floor(Math.random() * Math.floor(3))]
                }
              ]
            }
          }
          handleComplete={removeTodo} />
          // <Todo
          //   key={index}
          //   index={index}
          //   todo={todo}
          //   completeTodo={completeTodo}
          //   removeTodo={removeTodo}
          // />
        ))}
      </div>
    </div>
  );
}

export default App;
