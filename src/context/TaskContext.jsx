import { createContext, useContext, useState } from "react";
import supabase from "../supabase-client";
export const TaskContext = createContext()


export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) throw new Error('useTasks mus be used within a TaskContextProvider')
    return context
}


export const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [adding, setAdding] = useState(false)
    const [loading, setLoading] = useState(false)

    const user = async () => {
        try {

            const { data: session, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !session?.session) {
                console.error('No se pudo obtener la sesión o el usuario no está autenticado:', sessionError);
                return;
            }
            return session.session.user.id;

        } catch (error) {
            console.error(error)
        }
    }

    const getTasks = async (done = false) => {
        setLoading(true)
        const userId = await user();
        if (!userId) {
            console.error('No se pudo obtener el ID del usuario');
            return;
        }
        const { data, error } = await supabase
            .from("tasks")
            .select()
            .eq("userid", userId)
            .eq("done", done)
            .order("id", { ascending: true })
        if (error) {
            console.error('Error al obtener las tareas:', error)
            return;
        }
        setTasks(data)
        setLoading(false)
    };


    const createTask = async (taskName) => {
        setAdding(true)
        try {
            const { data: session, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !session?.session) {
                console.error('No se pudo obtener la sesión o el usuario no está autenticado:', sessionError);
                return;
            }
            const userId = session.session.user.id;
            console.log('Usuario autenticado:', userId);

            const result = await supabase.from('tasks').insert({
                name: taskName,
                userid: userId
            })
            getTasks()

        } catch (error) {
            console.error(error)
        }
        finally{setAdding(false)}
    }

    const deleteTask = async (id) => {
        try {
            console.log("Eliminando tarea con id:", id);
    
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id);
    
            if (error) {
                console.error('Error al eliminar la tarea:', error);
                return;
            }
    
            
            getTasks();
        } catch (error) {
            console.error(error);
        }
    };
    

    return <TaskContext.Provider value={{ tasks, getTasks, createTask, adding, loading, deleteTask }}>
        {children}
    </TaskContext.Provider>
}
