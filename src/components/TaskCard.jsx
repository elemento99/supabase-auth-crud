import { useTasks } from '../context/TaskContext'



function TaskCard({ task }) { 
    const {deleteTask, updateTask}= useTasks()

    
    const handleDelete = ()=>{
        deleteTask(task.id)
    }

    const handleToggleDone = ()=>{
        updateTask(task.id, {done: !task.done})
    }

    return (
        <div>
            <div >
                <h2>{task.name}</h2>
                <p>{JSON.stringify(task.done)}</p>
            </div>
            <button onClick={()=>handleDelete()}>Delete</button>
            <button onClick={()=>handleToggleDone()}>{task.done? "Not really done" : "Done"}</button>
        </div>

    );
}

export default TaskCard;
