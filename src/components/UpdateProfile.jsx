import React, { useState } from "react";
import useUpdate from "../hooks/useUpdate";

const UpdateProfile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {loading,handleUpdate}=useUpdate()

  async function handleSubmit(event){
    event.preventDefault()
    console.log(email)
    console.log(password)
    console.log(fullName)
    console.log(mobileNumber)
    console.log(designation)
    console.log(confirmPassword)

    await handleUpdate({email,fullName,password,confirmPassword,mobileNumber,designation})
    
  }

  return (
    // <div className="flex justify-center items-center h-screen">
    //   <form className="flex items-center flex-col gap-3" onSubmit={handleSubmit}>
    //   <h2 className="text-xl">Sign up</h2>
    //     <div className="text-xl flex flex-col gap-1">
    //       <label htmlFor="fullName">FullName</label>
    //       <input
    //         type="text"
    //         id="fullName"
    //         className="bg-gray-200 border-2 border-red-300 rounded-lg"
    //         value={fullName}
    //         onChange={(e) => setFullName(e.target.value)}
    //       />
    //     </div>
    //     <div className="text-xl flex flex-col gap-1">
    //       <label htmlFor="email">Email</label>
    //       <input
    //         type="email"
    //         id="email"
    //         className="bg-gray-200 border-2 border-red-300 rounded-lg"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>

    //     <div className="text-xl flex flex-col gap-1">
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         id="password"
    //         className="bg-gray-200 border-2 border-red-300 rounded-lg"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <div className="text-xl flex flex-col gap-1">
    //       <label htmlFor="confirmPassword">Confirm Password</label>
    //       <input
    //         type="password"
    //         id="password"
    //         className="bg-gray-200 border-2 border-red-300 rounded-lg"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       />
    //     </div>
    //     <div className="text-xl flex flex-col gap-1">
    //       <label htmlFor="phoneNumber">Phone Number</label>
    //       <input
    //         type="text"
    //         id="phoneNumber"
    //         className="bg-gray-200 border-2 border-red-300 rounded-lg"
    //         value={phoneNumber}
    //         onChange={(e) => setPhoneNumber(e.target.value)}
    //       />
    //     </div>
    //     <div className="text-xl flex flex-col gap-1">
    //       <label htmlFor="designation">Designation</label>
    //       <input
    //         type="text"
    //         id="designation"
    //         className="bg-gray-200 border-2 border-red-300 rounded-lg"
    //         value={designation}
    //         onChange={(e) => setDesignation(e.target.value)}
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className="bg-fuchsia-500 text-white cursor-pointer px-5 py-3 rounded-md"
    //     >
    //       SignUp
    //     </button>
    //   </form>
    // </div>
    <div className="flex justify-center items-center h-screen">
      <form
        className="flex items-center flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl">Update your Profile </h2>
        <div className="text-xl flex flex-col gap-1">
          <label htmlFor="fullName">FullName</label>
          <input
            type="text"
            id="fullName"
            className="bg-gray-200 border-2 border-red-300 rounded-lg"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
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

        <div className="text-xl flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="bg-gray-200 border-2 border-red-300 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-xl flex flex-col gap-1">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="password"
            className="bg-gray-200 border-2 border-red-300 rounded-lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="text-xl flex flex-col gap-1">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            className="bg-gray-200 border-2 border-red-300 rounded-lg"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div className="text-xl flex flex-col gap-1">
          <label htmlFor="designation">Designation</label>
          <input
            type="text"
            id="designation"
            className="bg-gray-200 border-2 border-red-300 rounded-lg"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
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
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
