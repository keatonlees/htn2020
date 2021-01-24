import React from 'react';

function NewTaskForm() {
  
    return (
      <form action='http://127.0.0.1:5000/create_task' method='POST' >
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

export default NewTaskForm;