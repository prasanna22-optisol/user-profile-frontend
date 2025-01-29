import { useState } from "react"
import api from "../api/api"

const useGetAllUsers=()=>{
    const [loading,setLoading]=useState(false)
    // const [users,setUsers]=useState([])
    // const [email,setEmail]=useState("")
    // const [fullName,setFullName]=useState("")
    const [filteredUsers,setFilteredUsers]=useState([])

    async function getAllUsers(email,fullName){
        setLoading(true)
        try{
            const res=await api.get(`/users/search`,{
                params:{
                    email:email || undefined,
                    fullName:fullName||undefined
                },
                headers:{
                    "Content-Type":"application/json"
                }
            })
            setFilteredUsers(res.data)
            console.log(res.data)
        }
        catch(error){
            console.error("Error getting all users: ",error)
        }
        finally{
            setLoading(false)
        }
    }

    return {getAllUsers,loading,filteredUsers}
}


export default useGetAllUsers