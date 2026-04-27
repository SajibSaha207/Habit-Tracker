import React, { useContext, useEffect, useState } from 'react';


import { MdMenu } from 'react-icons/md';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { MdOutlineHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RxUpdate } from "react-icons/rx";
import { IoWarningOutline } from "react-icons/io5";

const Navbar = () => {

  const { user, logOut } = useContext(AuthContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const role = sessionStorage.getItem("role");
  const homeRoute = role === "kazi" ? "/kaziverifyoption" : "/home";

  const handlelogOut = () => {
    logOut()
      .then(() => sessionStorage.removeItem("role"))
      .catch((error) => 
        console.log(error)
    );
  };

  const activeClass = "text-blue-600 border-b-2 border-blue-600 pb-1 font-bold";
  const normalClass = "text-gray-600 hover:text-blue-600";

  //  outside click close dropdown
  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between px-6 lg:px-10 py-4 bg-white shadow flex-nowrap z-50">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-xl lg:text-2xl font-bold text-gray-800 whitespace-nowrap">
            <Link to="/">
              Ekbar<span className='text-[#E527B2]'>Check</span>De
            </Link>
          </span>
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-4 ml-auto whitespace-nowrap">
          <NavLink to={homeRoute} className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
          <NavLink to="/howitwork" className={({ isActive }) => isActive ? activeClass : normalClass}>How It Works</NavLink>
          <NavLink to="/features" className={({ isActive }) => isActive ? activeClass : normalClass}>Features</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? activeClass : normalClass}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : normalClass}>Contact</NavLink>

           {!user && (
          <Link to="/" className="btn btn-primary h-[25px] w-[60px] ">
            Login
          </Link>
        )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 ml-3">

          {/* User Image (UNCHANGED) */}
          <div className="relative  ">
            <img
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              className='w-7 h-7 object-cover rounded-full cursor-pointer'
              src={user?.photoURL || usericon}
              alt="user"
              title={user?.displayName || user?.email}
            />

            {/*  Dropdown (ONLY kazi) */}
            {role === "kazi" && dropdownOpen && (
              <div
                className="absolute right-0 mt-7 w-60 bg-gray-100 shadow-lg rounded-lg p-3 z-50"
                onClick={(e) => e.stopPropagation()}
              >
               <div className=''>
                 <img className='w-7 h-7 object-cover rounded-full items-center justify-center mx-auto ' src={user?.photoURL || usericon}  alt="user"/>
                 <p className='text-center justify-center mx-auto'>{user?.displayName || user?.email}</p>
                 <p>---------------------------------</p>
               </div>

                    <Link to="/kaziprofile" className="flex items-center gap-1 text-sm text-black  hover:bg-amber-300 p-2 rounded-lg transition-transform duration-300 hover:scale-105 hover:-translate-y-2 mt-3 mb-2 ml-3  ">
                  <CgProfile></CgProfile> My Profile
                </Link>

                <Link to="/marriagehistory" className="flex items-center gap-1 text-sm text-black hover:bg-amber-300 p-2 rounded-lg transition-transform duration-300 hover:scale-105 hover:-translate-y-2 mb-2 ml-3">
                  <MdOutlineHistory></MdOutlineHistory> Marriage History
                </Link>

                <Link to="/divorceupdate" className="flex items-center gap-1 text-sm text-black hover:bg-amber-300 p-2 rounded-lg transition-transform duration-300 hover:scale-105 hover:-translate-y-2 mb-2 ml-3">
                  <RxUpdate ></RxUpdate> Divorce Update
                </Link>

                <Link to="/fraudcase" className="flex items-center gap-1 text-sm text-black hover:bg-amber-300 p-2 rounded-lg  transition-transform duration-300 hover:scale-105 hover:-translate-y-2 ml-3">
                  <IoWarningOutline></IoWarningOutline> Fraud Cases
                </Link>
              </div>
            )}
          </div>

          {/* Logout */}
          {user && (
            <Link
              to="/"
              onClick={handlelogOut}
              className="hidden md:flex items-center justify-center btn btn-outline btn-secondary btn-sm h-8 px-4 font-bold whitespace-nowrap"
            >
              Logout
            </Link>
          )}

          {/* Menu icon (mobile) */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MdMenu />
          </button>
        </div>

      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-2/3 sm:w-1/2 bg-white shadow-lg z-50 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>

        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} className="text-2xl">✕</button>
        </div>

        <div className="flex flex-col items-start gap-5 px-6 mt-4 text-lg">

          <NavLink to={homeRoute} onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
          <NavLink to="/howitwork" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>How It Works</NavLink>
          <NavLink to="/features" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Features</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>About</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Contact</NavLink>

            {!user && (
          <Link to="/" className="text-2xl text-center mt-6 w-full btn btn-outline btn-primary ">
            Login
          </Link>
        )}

          {user && (
            <button
              onClick={() => {
                handlelogOut();
                setMenuOpen(false);
              }}
              className="text-2xl text-center mt-6 w-full btn btn-outline btn-secondary"
            >
              Logout
            </button>
          )}

        </div>
      </div>

    </div>
  );
};

export default Navbar;