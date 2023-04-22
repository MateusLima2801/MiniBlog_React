import { useEffect, useState } from 'react';
import {getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        updateProfile,
        signOut
    } from 'firebase/auth'
import {db} from '../firebase/config'
    
export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled) return;
    }

    const createUser = async (data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)
        try {
            const {user} = await createUserWithEmailAndPassword(
                auth, 
                data.email,
                data.password
            )
            await updateProfile(user, {
                displayName: data.displayName
            })
            
            
            setLoading(false);
            return user;
        } catch (error) {
            console.log(error.message)
            console.log(typeof error)

            let systemErrorMessage

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            }else if(error.message.includes("email-already"))
            {
                systemErrorMessage = "E-mail já cadastrado."
            }
            else {
                systemErrorMessage = "Ocorreu um erro. Por favor, tente mais tarde."
            }
            
            setLoading(false);
            setError(systemErrorMessage)
        }


    };

    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    }

    const login = async (data) =>{
        checkIfIsCancelled()
        setLoading(true)
        setError(false)
        try{
            await signInWithEmailAndPassword(auth, data.email, data.password)
            
        }catch ( error ){
            let systemErrorMessage
            if(error.message.includes("user-not-found"))
            {
                systemErrorMessage = "Usuário não encontrado."
            }else if(error.message.includes("wrong-password")){
                systemErrorMessage = "Senha incorreta."
            }else {
                systemErrorMessage = "Ocorreu um erro. Por favor, tente mais tarde."
            }
            setError(systemErrorMessage);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        return () => setCancelled(true)
    }, [])

    return{
        auth, createUser, error, loading, logout, login
    }
}