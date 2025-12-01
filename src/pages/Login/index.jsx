import * as S from './styles';

import { useAuth } from '../../hooks/auth';
import { useState } from 'react';

import BluePayOne from '../../assets/BluePay.png';
import BluePayTwo from '../../assets/BluePayH.png';
import { LuEye, LuEyeClosed } from "react-icons/lu";

import Swal from 'sweetalert2';

export function Login(){
    const [passwordView, setPasswordView] = useState(false);
    const [loading, setLoading] = useState(false);
    const { Login } = useAuth();

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
    });

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    async function HandleLogin() {
     if (email.trim() == '' || password.trim() == '') return Toast.fire({ icon: "warning", title: 'Preencha todos os campos' });
     if (!/^\S+@\S+\.\S+$/.test(email)) return Toast.fire({ icon: "warning", title: 'Email inválido' });

     setLoading(true)
     try {
      await Login({email, password})
     } catch(error) {
      console.error(error)
      return Toast.fire({ icon: "error", title: error.response.data.message || 'Erro ao fazer login' });
     } finally {
      setLoading(false);
     }

    };

    return(
     <S.Container>
      <S.Form>
        <img src={BluePayOne} alt="" />
       <h1>Entrar</h1>

       <div className="input-wrapper">
        <label htmlFor="email" >Email</label>
        <input onChange={(e)=> setEmail(e.target.value)} placeholder="Digite seu email de acesso" type="email" id="email"/>
       </div>

        <div className="input-wrapper">
        <label htmlFor="password" >Senha</label>
        <div className="passwordDiv">
         <input onChange={(e)=> setPassword(e.target.value)}  placeholder="Digite sua senha de acesso" type={!passwordView ? 'text' : 'password'} id="password"/>
         {
          passwordView ?
          <LuEyeClosed className='icon' onClick={()=> setPasswordView(!passwordView)}/>
         :
          <LuEye className='icon'  onClick={()=> setPasswordView(!passwordView)}/>
         }
        </div>
       </div>

       <button disabled={loading} onClick={()=> HandleLogin()}>
        { loading ? 'Carregando...' : 'Continuar'}
       </button>
      </S.Form>
     </S.Container>
    )
}