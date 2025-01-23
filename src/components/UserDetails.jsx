import React from "react";
import PropTypes from "prop-types";



const UserDetails = () => {
  
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">User Details</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="p-2 font-medium">Full Name</td>
            <td className="p-2">{"Rajesh" }</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="p-2 font-medium">Email</td>
            <td className="p-2">{"Rajesh53@gmail.com"}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="p-2 font-medium">Designation</td>
            <td className="p-2">{"Manager"}</td>
          </tr>
          <tr>
            <td className="p-2 font-medium">Mobile Number</td>
            <td className="p-2">{"8873661102"}</td>
          </tr>
        </tbody>
      </table>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Update Profile
      </button>
      <button
        className="mt-4 px-4 py-2 ml-10 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
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
