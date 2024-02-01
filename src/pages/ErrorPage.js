import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/icons/Logo";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-[rgb(24,24,24)] dark:text-white">
      <Logo width={150} height={100} fill={"rgb(185, 43, 39)"} />
      <h1 className="text-4xl font-bold mb-4">404 error page not found</h1>
      <p className="text-lg mb-8 px-4 md:px-0">Oops! Something went wrong.</p>
      <div className="flex justify-center items-center space-x-4">
        <Link to="/">
          <div className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Go Home
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
