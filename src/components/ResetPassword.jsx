import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("profile-user"));
  console.log("Current User:", currentUser);
  const userId = currentUser._id;

  const navigate=useNavigate()


  async function handleSubmit(event) {

    event.preventDefault()
    setLoading(true)

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      navigate("/")
      return;
    }

    try{

      const response=await api.patch("/users/reset-password",{
        userId,
        newPassword,
        confirmPassword
      })
    
      console.log("Password reset successfully :",response.data)
      setMessage(response.data.message)

    }
    catch(error){
      console.error(error)
      setMessage("Failed to reset password. Please try again.")
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
          <label htmlFor="email">New Password</label>
          <input
            type="password"
            id="newPassword"
            className="bg-gray-200 border-2 border-red-300 rounded-lg"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="text-xl flex flex-col gap-1">
          <label htmlFor="email">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="bg-gray-200 border-2 border-red-300 rounded-lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            "Reset Password"
          )}
        </button>
      </form>
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
};

export default ResetPassword;
