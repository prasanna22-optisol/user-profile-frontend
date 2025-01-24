import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleLogin } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin(email,password)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="flex items-center flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl">Login</h2>

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
        <div className="text-sm flex flex-row align-center justify-center">
          <p>Do not have an account ? <a href="/signup" className="text-green-600 cursor-pointer">Register</a> here </p>
        </div>

        <div className="text-sm flex flex-row align-center justify-center">
          <p><a href="/forgot-password" className="text-blue-600 cursor-pointer">Forgot Password</a>  </p>
        </div>

        <div className="text-sm flex flex-row align-center justify-center">
          <p><a href="/reset" className="text-blue-600 cursor-pointer">Reset Password</a>  </p>
        </div>
        <button
          type="submit"
          className="bg-fuchsia-500 text-white cursor-pointer px-5 py-3 rounded-md"
          disabled={loading}
        >
          {loading ? (
            <span className={"loading loading-spinner"}></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
