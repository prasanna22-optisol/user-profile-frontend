import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api/api";
import { useNavigate } from "react-router-dom";



const UserDetails = () => {

  const navigate=useNavigate()

  const [user,setUser]=useState("")
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)

  const refData = JSON.parse(localStorage.getItem("profile-user") || "{}");
  console.log("Stored user: ", refData);

  useEffect(()=>{
    const fetchUser=async()=>{
      setLoading(true)
      setError(null)
      try{
        const response=await api.get(`/users/get-user/${refData?._id}`)
        console.log("User fetched: ",response.data.data)
        setUser(response.data.data)
      }
      catch(error){
        console.error("Error getting user details: ",error)
        setError(error.response?.data?.message || error.message)
      }
      finally{
        setLoading(false)
      }
      
    }
    if(refData._id){
      fetchUser()
    }
  },[refData._id])


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log("User: ", user)





  
  
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">User Details</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="p-2 font-medium">Full Name</td>
            <td className="p-2">{user?.fullName }</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="p-2 font-medium">Email</td>
            <td className="p-2">{user?.email}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="p-2 font-medium">Designation</td>
            <td className="p-2">{user?.designation}</td>
          </tr>
          <tr>
            <td className="p-2 font-medium">Mobile Number</td>
            <td className="p-2">{user?.mobileNumber}</td>
          </tr>
        </tbody>
      </table>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        onClick={()=>navigate("/update")}
      >
        Update Profile
      </button>
      <button
        className="mt-4 px-4 py-2 ml-10 bg-amber-700 text-white font-semibold rounded-md hover:bg-blue-600"
        onClick={()=>navigate("/all")}
      >
        All Users
      </button>
      <button
        className="mt-4 px-4 py-2 ml-10 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
        onClick={
          () => {
            localStorage.removeItem("profile-user");
            navigate("/login");
          }
        }

      >
       Logout
      </button>
      
    </div>
  );
};

UserDetails.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    designation: PropTypes.string,
    mobileNumber: PropTypes.string,
  })
};


export default UserDetails;
