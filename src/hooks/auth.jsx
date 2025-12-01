import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api"; 
import Swal from 'sweetalert2';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
    });//Alertas

    const [data, setData] = useState(null);

    async function Login({ email, password }) {
        if (!email.trim() || !password.trim()) return;
        try {
            const Response = await api.post('/login', { email, password });

            const user = Response.data.user;
            
            if (!user) return Toast.fire({
                    icon: "warning",
                    title: 'Usuário ou senha inválidos.'
                });
                
            localStorage.setItem('@payblue:user', JSON.stringify(user));
            console.log('usuario logado')
            setData(user);
    
        } catch (error) {
            console.log(error);
            if (error.response) {
                Toast.fire({
                    icon: "warning",
                    title: error.response.data.error
                });
            } else {
                Toast.fire({
                    icon: "warning",
                    title: "Não foi possível entrar."
                });
            }
        }
    };//função de login

    function Logout() {
        localStorage.removeItem("@payblue:user");
      
        setData(null);
    };//função de logout

    useEffect(() => {     
     const AsUser = localStorage.getItem('@payblue:user');

     setData(JSON.parse(AsUser));
     return
    }, []);//buscar usuário

    return (
        <AuthContext.Provider value={{ Login, Logout, User: data }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };
