import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import api from "../api/api.js";


function handleInputErrors(inputs){
    const { email, password} = inputs;

    if(!email || !password ){
        alert("Please fill all fields")
        console.error("Fill all fields")
        return false
    }
    return true
}
const useLogin=()=>{

    const [loading,setLoading]=useState(false)
    const {setAuthUser}=useAuthContext()
    
    const handleLogin=async(email,password)=>{
        const success = handleInputErrors({email,password})
        if(!success){
            return
        }
        setLoading(true)
        try{
            const res=await api.post("/auth/login",{email,password})
            const user=res.data
            console.log(user)
            localStorage.setItem("profile-user",JSON.stringify(user.data))
            setAuthUser(user.data)
        }
        catch(error){
            console.error(error)
            alert(error.message)
        }
        finally{
            setLoading(false)
        }
    }
    return {handleLogin,loading}

}

export default useLogin