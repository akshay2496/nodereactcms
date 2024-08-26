import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  // Check if user is authenticated
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div className="bg-blue-300">
      <div className="px-10 py-5">
        {auth ? (
          <ul className="flex gap-5 items-center justify-end">
            <li>
              <Link
                to="/cms"
                className="font-semibold text-xl text-white hover:text-black"
              >
                Cms
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="font-semibold text-xl text-white hover:text-black"
              >
                Product
              </Link>
            </li>
            {/* <li>
              <Link
                to="/add"
                className="font-semibold text-xl text-white hover:text-black"
              >
                Add Product
              </Link>
            </li>
            <li>
              <Link
                to="/update"
                className="font-semibold text-xl text-white hover:text-black"
              >
                Update Product
              </Link>
            </li> */}
            <li>
              <Link
                to="/profile"
                className="font-semibold text-xl text-white hover:text-black"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="font-semibold text-xl text-white hover:text-black"
              >
                Logout ({JSON.parse(auth).name})
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex gap-5 items-center justify-end">
            <li>
              <Link
                className="font-semibold text-xl text-white hover:text-black"
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                className="font-semibold text-xl text-white hover:text-black"
                to="/login"
              >
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Nav;
