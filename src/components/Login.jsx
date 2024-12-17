import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase-client';


const Login = () => {
  const navigate = useNavigate()


  const [email, setEmail] = useState(''); // Estado para almacenar el email ingresado

  const handleLogin = async () => {
    try {
      if (!email) {
        console.error('Por favor, ingresa un correo electrónico válido.');
        alert('El campo de correo electrónico no puede estar vacío.');
        return;
      }
  
      const redirectTo = window.location.origin; // Puedes usarlo más adelante para redirecciones
  
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });
  
      if (error) {
        throw new Error(error.message);
      }
  
      console.log('Enlace enviado a:', email);
      alert('Enlace enviado. Revisa tu bandeja de entrada.');
    } catch (err) {
      console.error('Error al iniciar sesión:', err.message);
      alert('Hubo un error. Por favor, revisa el correo e inténtalo de nuevo.');
    }
  };
  


useEffect(() => {
  const checkSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error al obtener la sesión:", error);
    } else if (session) {
      navigate("/")
    
    }
  };

  checkSession();
}, [navigate]);


  return (
    <div>
      <h1>Iniciar sesión</h1>
      <div>
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo"
        />
      </div>
      <button onClick={handleLogin}>Enviar enlace de inicio de sesión</button>
    </div>
  );
};

export default Login;
