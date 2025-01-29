import React from "react";

const UserCard = ({ email, fullName, designation, mobileNumber }) => {
  return (
    <div className="w-full max-w-lg p-4 shadow-lg rounded-2xl bg-white m-10">
      <div className="flex justify-between p-4 items-center">
        <div className="text-left">
          <p className="text-lg font-medium">{fullName}</p>
          <p className="text-gray-600 font-light">{email}</p>
        </div>
        <div className="text-left">
          <p className="text-red-700">{designation}</p>
          <p className="text-gray-600 font-light">{mobileNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
