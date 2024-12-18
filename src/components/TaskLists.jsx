import React, { useEffect } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskCard from './TaskCard'


const TaskLists = () => {

  const { tasks, getTasks, loading } = useTasks()
  

  useEffect(() => {
    
    getTasks(false)
  }, [])

  function renderTasks() {
    if (loading) {
      return <p>
        Loading...
      </p>
    }
    else if (tasks.length === 0) {
      return <p>No tasks found</p>
    }
    else {
      return (
        <div >
          {
            tasks.map(task => (
              <TaskCard task={task} />

            ))
          }
        </div>
      )


    }
  }

  return <div>
    {renderTasks()}
  </div>
}



export default TaskLists