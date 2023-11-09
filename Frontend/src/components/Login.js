import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ setCurrentuser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const SubmitHandler = (e) => {
    e.preventDefault();

    const PostData = async () => {
      try {
        const data = {
          email: email,
          password: password,
        };

        const response = await axios.post(
          "http://localhost:5000/api/employee/login",
          data
        );
        // console.log(response.data.currentuser);
        console.log(response.data);
        console.log(response.data.currentuser);
        if (response.data.token) {
          setCurrentuser(response.data.currentuser);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem(
            "currentuser",
            JSON.stringify(response.data.currentuser)
          );
          navigate("/bikeassembly");
        }
      } catch (err) {
        console.log(err);
      }
    };
    PostData();
  };

  return (
    <div className="container mt-10 mx-auto max-w-sm ">
      <div className="text-2xl text-center text-gray-700 font-semibold ">
        <h1>Login Form</h1>
      </div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={SubmitHandler}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
