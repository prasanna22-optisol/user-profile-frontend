import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';



export const AuthContext=createContext()

export const useAuthContext=()=>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
}

export const AuthContextProvider = ({children}) => {

    


    const storedUser=localStorage.getItem("profile-user")
    
    console.log("Stored user: ", storedUser)

    const [authUser,setAuthUser]=useState(storedUser ? JSON.parse(storedUser) : null)

    return (
        <AuthContext.Provider value={{authUser,setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )


}