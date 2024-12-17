import { createContext, useContext, useState } from "react";

export const TaskContext = createContext()


export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) throw new Error('useTasks mus be used within a TaskContextProvider')
    return context
}


export const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])


    return <TaskContext.Provider value={{ tasks, }}>
        {children}
    </TaskContext.Provider>
}
