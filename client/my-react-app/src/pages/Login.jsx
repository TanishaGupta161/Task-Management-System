import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/auth";
const Login = () => {
  const [data, setData] = useState({ name: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/v1/login", data);
      if (res.status === 200) {
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        dispatch(loginSuccess({ token: res.data.token, user: res.data.user }));
        alert("Login successful!");
        navigate("/home");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="container max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="name" className="text-white">Name:</label>
          <input type="text" id="name" name="name"
            value={data.name} onChange={handleChange} required
            className="p-2 rounded bg-gray-700 text-white" />

          <label htmlFor="password" className="text-white">Password:</label>
          <input type="password" id="password" name="password"
            value={data.password} onChange={handleChange} required
            className="p-2 rounded bg-gray-700 text-white" />

          <button type="submit"
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded mt-4">
            Login
          </button>

          <p className="text-gray-400 text-sm mt-2">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
