import React, { useEffect, useState } from "react";
import useGetAllUsers from "../hooks/userGetAllUsers";
import UserCard from "./UserCard";
import api from "../api/api";

const AllUsers = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedFullName, setDebouncedFullName] = useState(fullName);
  const [debouncedEmail, setDebouncedEmail] = useState(email);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedEmail(email);
      setDebouncedFullName(fullName);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [email, fullName]);

  // useEffect to trigger the user search when email or fullName changes
  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const res = await api.get("/users/all",{
          params: {
            page,
          },
        });
        console.log(res.data)
        setFilteredUsers(res.data.data);
        setTotalPages(res.data.pagination.totalPages || 1);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await api.get("/users/search", {
          params: {
            email: debouncedEmail || undefined,
            fullName: debouncedFullName || undefined,
            page,
          },
        });
        console.log(res)
        setFilteredUsers(res.data.data);
        setTotalPages(res.data.pagination.totalPages || 1);
        
        console.log("Filtered Users: ", res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedEmail || debouncedFullName) {
      getUsers();
    } else {
      // Reset filtered users when no search criteria are entered
      getAllUsers();
    }
  }, [debouncedEmail, debouncedFullName, page]); // Trigger whenever email or fullName changes

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    // getUsers will be triggered automatically on input change due to useEffect
  };

  return (
    <div>
      <h2 className="text-center mt-10 font-semibold">All Users</h2>

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

      {loading ? (
        <div className="text-center mt-4">Loading... Please wait</div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center mt-4">No users found</div>
      ) : (
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
      )}

      {totalPages > 0 && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-lg ${
              page === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
