import React, { useEffect } from 'react'
import supabase from '../supabase-client'
import { useNavigate } from 'react-router-dom';

import TaskForm from '../components/TaskForm';
import TaskLists from '../components/TaskLists';


const Home = () => {
  const navigate = useNavigate()


  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error al obtener la sesión:", error);
      } else if (session) {
        navigate("/")
      } else {
        navigate("/login")
      }
    };

    checkSession();
  }, [navigate]);



  return (
    <div>
      <button
        onClick={async () => {
          try {
            const { error } = await supabase.auth.signOut()
            if (error) {
              console.error("Error al cerrar sesión:", error)
            } else {
              navigate("/")
            }
          } catch (err) {
            console.error("Error inesperado:", err)
          }
        }}
      >
        Logout
      </button>

      <TaskForm />
      <TaskLists />
    </div>
  )
}

export default Home