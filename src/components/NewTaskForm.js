import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import classes from './Task.module.css';

function NewTaskForm() {
    const [dueDate, setDueDate] = useState('');
  
    return (
      <form action='http://127.0.0.1:5000/create_task' method='POST' className={ classes.Form } >
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
        <DatePicker
          id="date_end"
          name="date_end"
          selected={Date.parse(dueDate)}
          value={dueDate}
          onChange={date => {setDueDate([date.toString().slice(0, 3), ', ', date.toString().slice(4, 24)].join(''))}}
        /><br /><br />
        <input
          type="submit"
          value="Create task"
        />
      </form>
    );
}

export default NewTaskForm;