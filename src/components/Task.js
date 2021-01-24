import React from 'react';
import classes from './Task.module.css';
import axios from '../axios';

function Task({ task }) {

    function handleComplete(task_id) {
        axios.post(('/delete_task/' + task_id))
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }


    // Temporary way to set colours of tags
    const colors =  {
        'Home': '#5BD3AD',
        'School': '#00A1E6',
        'Work': '#A055DD'
    }

    const getTags = task.tags.map((tag) => {
        return (
        <div className={ classes.Tag } style={{backgroundColor: colors[tag.title]}} >
            <p >{ tag.title }</p>
        </div>
        ) 
    })

    return (
        <div className={ classes.Container } >
            <div className={ classes.SubcontOne } >
                <form >
                    <input
                        type="checkbox" 
                        name="complete_task" 
                        className={ classes.Checkbox } 
                        onClick={() => handleComplete(task.id)} />
                </form>
            </div>
            <div className={ classes.SubcontTwo } >
                <p className={ classes.Title } >{ task.title }</p>
                <p className={ classes.Date } >{ task.due_date }</p>
                <div className={ classes.TagContainer } >
                   { getTags } 
                </div>
            </div>
        </div>
    )
}

export default Task;