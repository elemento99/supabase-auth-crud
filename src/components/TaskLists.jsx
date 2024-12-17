import React from 'react'
import { useTasks } from '../context/TaskContext'

const TaskLists = () => {

    const {tasks}=useTasks()
    console.log(tasks)

  return (
    <div>TaskLists</div>
  )
}

export default TaskLists