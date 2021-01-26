import React from 'react';
import Backdrop from './Backdrop';
import axios from '../axios';
import classes from './Task.module.css';

function TaskCard({task, updateTasks, closeCard}) {
    async function handleComplete(task_id) {
        axios.post(('http://127.0.0.1:5000/delete_task/' + task_id))
        .then(response => console.log(response))
        .catch(error => console.log(error))

        updateTasks();
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
        <>
            <Backdrop clicked={ closeCard } />
            
            <div className={ classes.Container_two } >
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
        </>
    )
}

export default TaskCard;