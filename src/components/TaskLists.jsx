import React, { useEffect } from 'react'
import { useTasks } from '../context/TaskContext'



const TaskLists = () => {

    const {tasks, getTasks}=useTasks()
    console.log("tasks desde el task list", tasks)

useEffect(()=>{
    getTasks(false)
},[])

  return (
    <div>
      {
        tasks.map(tasks=><div key={tasks.id}> 
        {tasks.name}</div>
        )
      }
    </div>
  )
}

export default TaskLists