import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase-client';

function Navbar() {
    const [session, setSession] = useState(null);
    const navigate = useNavigate();

    // Función para verificar la sesión
    const checkSession = async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
            console.error("Error al obtener sesión:", error);
        } else {
            setSession(session);
        }
        console.log("checkSession ejecutado", session);
    };

    // Comprobamos la sesión cuando el componente se monta
    useEffect(() => {
        checkSession();
    }, []);

    // Función de logout
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Error al cerrar sesión:", error);
            } else {
                console.log("Sesión cerrada correctamente");
                // Redirigir inmediatamente después de cerrar sesión
            }
        } catch (err) {
            console.error("Error inesperado:", err);
        }
        navigate("/")
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container">
                <a className="navbar-brand" href="#">Supabase react</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {session && (
                            <li className="nav-item">
                                <button
                                    className="nav-link btn" 
                                    onClick={handleLogout} 
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
