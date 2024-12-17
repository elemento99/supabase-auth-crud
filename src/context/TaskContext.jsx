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

    const user = async () => {
        try {
            // Obtén la sesión actual
            const { data: session, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !session?.session) {
                console.error('No se pudo obtener la sesión o el usuario no está autenticado:', sessionError);
                return;
            }
            return session.session.user.id; // Obtén el ID del usuario

        } catch (error) {
            console.error(error)
        }
    }

    const getTasks = async (done=false) => {
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
            .order("id",{ascending: true})
        if (error) {
            console.error('Error al obtener las tareas:', error);
            return;
        }
        setTasks(data); 
    };

    return <TaskContext.Provider value={{ tasks, getTasks }}>
        {children}
    </TaskContext.Provider>
}
