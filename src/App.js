import React from "react";
import "./App.css";
import TitleBlock from "./pages/TitleBlock";
import Task from './components/Task';
import axios from './axios';

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!value) return;
  //   addTodo(value);
  //   setValue("");
  // };

  function createTask(form) {
    axios.post('/create_task', form)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <form onSubmit={() => createTask(this)}>
      <label for="title" >Title</label>
      <input
        id="title"
        name="title"
        type="text"
        className="input"
      /><br /><br />
      <label for="content" >Description</label>
      <input
        id="content"
        name="content"
        type="text"
        className="input"
      /><br /><br />
      <label for="tags" >Tags</label><br />
      <select
        id="tags"
        name="tags"
        className="input" >
          <option value="Home" >Home</option>
          <option value="Work" >Work</option>
          <option value="School" >School</option>
      </select><br /><br />
      <label for="date_end" >Due</label>
      <input
        id="date_end"
        name="date_end"
        type="text"
        className="input"
      /><br /><br />
      <input
        type="submit"
        value="Create task"
      />
    </form>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null
    };
  }
  
  componentDidMount() {
    fetch('/_get_date')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ date: data["date"]})
      });
  };
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
      <TodoForm />
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
