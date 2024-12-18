import React, { useEffect,useState } from 'react'
import supabase from '../supabase-client'
import { useNavigate } from 'react-router-dom';

import TaskForm from '../components/TaskForm';
import TaskLists from '../components/TaskLists';


const Home = () => {
  const navigate = useNavigate()
  const [showTaskDone,setShowTaskDone]=useState(false)


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
      <TaskForm />
      <header>
        <span>Task pending</span>
        <button onClick={()=>setShowTaskDone(!showTaskDone)}>
        {showTaskDone? "Show undone Tasks" : "Show done tasks"}
        </button>
      </header>
      <TaskLists  done={showTaskDone} />
    </div>
  )
}

export default Home