import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate=useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    try{
      const response=await api.post("/users/forgot-password",{
          email
      })
      const token=response.data.token
      if(token){
        navigate(`/reset/${token}`)
        console.log(response.data)
         setMessage(response.data.message)
      }
      else{
        setMessage("Reset Token Not Found.")
      }
      
      
    }
    catch(error){
      console.error(error)
      setMessage("Failed to send reset link. Please try again.")
    }
    finally{
      setLoading(false)
      setMessage("")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="flex items-center flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <div className="text-xl flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="bg-gray-200 border-2 border-red-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-fuchsia-500 text-white cursor-pointer px-5 py-3 rounded-md"
          disabled={loading}
          
        >
          {loading ? (
            <span className={"loading loading-spinner"}></span>
          ) : (
            "Send reset link"
          )}
        </button>
      </form>
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
