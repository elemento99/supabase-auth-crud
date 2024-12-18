import { useTasks } from '../context/TaskContext'



function TaskCard({ task }) { 
    const {deleteTask}= useTasks()

    
    const handleDelete = ()=>{
        deleteTask(task.id)
    }

    return (
        <div>
            <div >
                <h2>{task.name}</h2>
                <p>{JSON.stringify(task.done)}</p>
            </div>
            <button onClick={()=>handleDelete()}>delete</button>
            <button onClick={()=>hadleToggleDone()}>done</button>
        </div>

    );
}

export default TaskCard;
