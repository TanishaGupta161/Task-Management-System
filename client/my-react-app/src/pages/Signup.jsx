import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [Data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Data.name || !Data.email || !Data.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/sign-in",
        Data
      );

      
      if (response.status >= 200 && response.status < 300) {
        alert("Signup successful!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        alert(`Signup failed: ${error.response.data.message}`);
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="container max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="name" className="text-white">
            Name:
          </label>
          <input
            type="text"
            id="name"
            required
            className="p-2 rounded bg-gray-700 text-white"
            onChange={(e) => setData({ ...Data, name: e.target.value })}
          />

          <label htmlFor="email" className="text-white">
            Email:
          </label>
          <input
            type="email"
            id="email"
            required
            className="p-2 rounded bg-gray-700 text-white"
            onChange={(e) => setData({ ...Data, email: e.target.value })}
          />

          <label htmlFor="password" className="text-white">
            Password:
          </label>
          <input
            type="password"
            id="password"
            minLength={8}
            required
            className="p-2 rounded bg-gray-700 text-white"
            onChange={(e) => setData({ ...Data, password: e.target.value })}
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mt-4"
          >
            Sign Up
          </button>

          <p className="text-gray-400 text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
