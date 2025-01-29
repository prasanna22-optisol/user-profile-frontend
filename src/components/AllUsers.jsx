import React, { useEffect, useState } from "react";
import useGetAllUsers from "../hooks/userGetAllUsers";
import UserCard from "./UserCard";
import api from "../api/api";

const AllUsers = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedFullName,setDebouncedFullName] =useState(fullName)
  const [debouncedEmail,setDebouncedEmail] = useState(email)


  useEffect(()=>{
    const timer=setTimeout(()=>{
        setDebouncedEmail(email)
        setDebouncedFullName(fullName)
    },500)

    return ()=>{
        clearTimeout(timer)
    }
  },[email,fullName])

  // useEffect to trigger the user search when email or fullName changes
  useEffect(() => {
    const getAllUsers=async()=>{
        setLoading(true)
        try{
            const res=await api.get("/users/all")
            setFilteredUsers(res.data.data)
        }
        catch(error){
            console.error("Error fetching users: ",error)
        }
        finally{
            setLoading(false)
        }
    }
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await api.get("/users/search", {
          params: {
            email: debouncedEmail || undefined,
            fullName: debouncedFullName || undefined,
          },
        });
        setFilteredUsers(res.data.data);
        console.log("Filtered Users: ", res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedEmail|| debouncedFullName) {
      getUsers();
    } else {
      // Reset filtered users when no search criteria are entered
      getAllUsers()
    }
  }, [debouncedEmail, debouncedFullName]); // Trigger whenever email or fullName changes

  const handleSubmit = (e) => {
    e.preventDefault();
    // getUsers will be triggered automatically on input change due to useEffect
  };

  // Conditional loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // No users found
  if (filteredUsers.length === 0 && (debouncedEmail || debouncedFullName)) {
    return <div>No users found</div>;
  }

  return (
    <div>
      <h2 className="text-center mt-10 font-semibold">All Users</h2>

      {/* Search Form with Styling */}
      <form
        id="searchForm"
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 mt-6"
      >
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-4 py-2 border rounded-lg w-64"
        />
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="px-4 py-2 border rounded-lg w-64"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Display Filtered Users */}
      <div className="mt-8">
        {filteredUsers.map((user, index) => (
          <div key={index} className="flex justify-center mb-6">
            <UserCard
              email={user?.email}
              fullName={user?.fullName}
              designation={user?.designation}
              mobileNumber={user?.mobileNumber}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
