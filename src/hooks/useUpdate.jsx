import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
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

  if (!Object.values(inputs).some((val) => val)) {
    console.error("Atleast one field must be provided");
    alert("Atleast one field must be provided");
    return false;
  } else {
    if (password && confirmPassword && password != confirmPassword) {
      console.error("Passwords do not match");
      alert("Passwords do not match");
      return false;
    }
    if (password && password.length < 4) {
      console.error("Password length must be at least 4 characters");
      alert("Password length must be at least 4 characters");
      return false;
    }
    if (confirmPassword && confirmPassword.length < 4) {
      console.error("Confirm Password length must be at least 4 characters");
      alert("Confirm Password length must be at least 4 characters");
      return false;
    }
    if (mobileNumber && mobileNumber.length !== 10) {
      console.error("Invalid Phone Number");
      alert("Invalid Phone Number");
      return false;
    }
    return true;
  }
}

const useUpdate = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  async function handleUpdate(inputs) {
    const success = handleInputErrors(inputs);
    if (!success) {
      return;
    }
    setLoading(true);
  
    try {
      const {
        email,
        fullName,
        password,
        confirmPassword,
        mobileNumber,
        designation,
      } = inputs;
  
      const currentUser = JSON.parse(localStorage.getItem("profile-user"));
      console.log("Current User:", currentUser);
      const userId = currentUser._id;
  
      const updateData = {};
      Object.keys(inputs).forEach((key) => {
        if (inputs[key] !== undefined && inputs[key] !== "") {
          updateData[key] = inputs[key];
        }
      });
  
      console.log("Fields to update:", updateData);
  
      const response = await api.put(`/users/update/${userId}`, updateData);
  
      const updatedUser = { ...currentUser, ...updateData };
  
      console.log("Updated User:", updatedUser);
  
      setAuthUser(updatedUser);
      localStorage.setItem("profile-user", JSON.stringify(updatedUser));
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to update. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  
  return { handleUpdate, loading };
};

export default useUpdate;
