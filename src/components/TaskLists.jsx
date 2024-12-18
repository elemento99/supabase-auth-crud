import React, { useEffect } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskCard from './TaskCard'


const TaskLists = ({ done }) => {  

  const { tasks, getTasks, loading } = useTasks()

  useEffect(() => {
    getTasks(done)  
  }, [done])  

  function renderTasks() {
    if (loading) {
      return <p>Loading...</p>
    } else if (tasks.length === 0) {
      return <p>No tasks found</p>
    } else {
      return (
        <div>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />  // Asegúrate de pasar una key única
          ))}
        </div>
      )
    }
  }

  return <div>{renderTasks()}</div>
}

export default TaskLists
