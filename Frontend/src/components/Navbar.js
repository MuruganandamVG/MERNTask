import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto max-w-[85%] flex justify-between items-center">
          <div className="text-white text-2xl font-semibold">
            Bike Assembly App
          </div>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-white text-xl ">
                Home
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-white text-xl">
                Signup
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-white text-xl hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link to="/admin" className="text-white text-xl hover:underline">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
