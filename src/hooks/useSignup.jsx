import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";


function handleInputErrors(inputs) {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      designation,
      mobileNumber,
    } = inputs;

    console.log("Inputs: ", inputs);

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !designation ||
      !mobileNumber
    ) {
      console.error("Please fill all fields");
      alert("Please fill all fields");
      return false;
    }

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      alert("Passwords do not match");
      return false;
    }

    if (password.length < 4) {
      console.error("Password length must be atleast 4 characters");
      alert("Password length must be atleast 4 characters");
      return false;
    }

    if (mobileNumber.length < 10) {
      console.error("Mobile Number should be 10 digits long");
      alert("Mobile Number should be 10 digits long");
      return false;
    }

    return true;
  }


const useSignup = () => {

    const navigate=useNavigate()
  
    const [loading,setLoading]=useState(false)

    const {setAuthUser}=useAuthContext()

    async function handleSignup(inputs) {
        const success=handleInputErrors(inputs)
        if(!success){
            return 
        }
        setLoading(true)

        try{
            const {email,fullName,password,confirmPassword,mobileNumber,designation}=inputs
            const response=await api.post("/auth/register",{email,fullName,password,confirmPassword,mobileNumber,designation})
            const user=response.data
            console.log("User registered successfully: ",user)
            setAuthUser(user.data)
            localStorage.setItem("profile-user",JSON.stringify(user.data))
            if(localStorage.getItem("profile-user")){
              navigate("/")
            }
          

        }
        catch(error){
            console.error(error)
            alert("Failed to register. Please try again")
        }
        finally{
            setLoading(false)
        }
    }

    

    return {handleSignup,loading}

};

export default useSignup;
