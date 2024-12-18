import React from 'react'
import { useState } from 'react'
import { useTasks } from '../context/TaskContext'

const TaskForm = () => {


    const [taskName, setTaskName] = useState('')
    const {createTask, adding}=useTasks()

    const handleSubmit = async e => {
        e.preventDefault()
        createTask(taskName)
        console.log(adding)
    }

    return (
        <div>
            <form >
                <input type="text" 
                name="taskName" 
                placeholder="Write a trask name" 
                onChange={(e) => setTaskName(e.target.value)} />
            </form>
            <button type="submit" onClick={handleSubmit} disabled={adding}>{adding? "Adding ..." : "Add"}</button>
        </div>
    )
}

export default TaskForm