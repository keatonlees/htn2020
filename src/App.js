import React, { Component } from "react";
import "./App.css";
import TitleBlock from "./pages/TitleBlock";
import Task from './components/Task';
import NewTaskForm from './components/NewTaskForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null
    };
  }
  
  componentDidMount() {
    fetch('/get_tasks')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({ tasks: Object.values(data) })
    })
    .catch((error) => {
      console.log(error)
    })
  };

  updateTasks() {
    fetch('/get_tasks')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({ tasks: Object.values(data) })
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  render() {
    return (
      <div className="app" >
        <NewTaskForm />
        <TitleBlock />
        <div className="todo-list">
          {this.state.tasks && this.state.tasks.map(( todo, index ) => {
            return <Task task={
              {
                'id': todo.id,
                'title': todo.content,
                'due_date': todo.due,
                'tags': [
                  {
                    'title': todo.tag
                  }
                ]
              }
            }
            updateTasks={() => this.updateTasks()}
            key={index} />
        })}
        </div>
      </div>
    );
  }
}

export default App;
