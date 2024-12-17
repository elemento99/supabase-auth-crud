import React from 'react'
import { useState } from 'react'
import supabase from '../supabase-client'

const TaskForm = () => {


    const [taskName, setTaskName] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        try {

            // Obtén la sesión actual
            const { data: session, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !session?.session) {
                console.error('No se pudo obtener la sesión o el usuario no está autenticado:', sessionError);
                return;
            }

            const userId = session.session.user.id; // Obtén el ID del usuario
            console.log('Usuario autenticado:', userId);

            const result = await supabase.from('tasks').insert({
                name: taskName,
                userid: userId
            })
            console.log(result)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form >
                <input type="text" name="taskName" placeholder="Write a trask name" onChange={(e) => setTaskName(e.target.value)} />
            </form>
            <button type="submit" onClick={handleSubmit}>Submit task</button>
        </div>
    )
}

export default TaskForm