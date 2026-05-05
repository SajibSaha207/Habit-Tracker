import  { useContext, useEffect, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { Link, NavLink } from 'react-router';
import '../index.css';
import logo from "../assets/habit_tracker_logo.png"
import usericon from "../assets/user.png"
import { CgProfile } from "react-icons/cg";
import { AuthContext } from '../Provider/AuthProvider';
import img1 from '../assets/img 1.png';

const Navbar = () => {

  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handlelogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const activeClass = "text-blue-600 border-b-2 border-blue-600 pb-1 font-bold";
  const normalClass = "text-gray-600 hover:text-blue-600";

  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className=''>

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between px-6 lg:px-10 py-4 bg-white shadow flex-nowrap z-50">

        {/* Logo */}
        <div className=" flex items-center gap-3">
          <span className="text-xl lg:text-2xl font-bold text-gray-800 whitespace-nowrap">
            <img className='h-[40px] w-[50px]' src={logo} alt="" />
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 ml-auto whitespace-nowrap">
          <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
          <NavLink to="/addhabit" className={({ isActive }) => isActive ? activeClass : normalClass}>Add Habit</NavLink>
          <NavLink to="/features" className={({ isActive }) => isActive ? activeClass : normalClass}>My Habits</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? activeClass : normalClass}>Public Habits</NavLink>

          {!user && (
            <Link to="/auth/login" className="btn btn-primary">
              Login
            </Link>
          )}

          {/* SIGNUP BUTTON */}
           {!user && (
            <Link to="/auth/signup" className="btn btn-error">
              Signup
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className=" flex items-center gap-3 ml-3">

          {/* User Image */}
          <div className="relative">
            <img
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              className='w-7 h-7 object-cover rounded-full cursor-pointer'
              src={user?.imageUrl || usericon}
              alt="user"
              title={user?.displayName || user?.email}
            />

            {/* Dropdown */}
            {dropdownOpen && user && (
              <div
                className="absolute right-0 mt-7 w-60 bg-gray-100 shadow-lg rounded-lg p-3 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className='text-center mb-2'>
                  <img className='w-10 h-10 object-cover rounded-full mx-auto' src={user?.photoURL || usericon} alt="user" />
                  <p className='text-sm mt-1'>{user?.displayName || user?.email}</p>
                  <hr className='my-2' />
                </div>
                <Link to="/profile" className="flex items-center gap-1 text-sm text-black hover:bg-amber-300 p-2 rounded-lg transition-all duration-300 hover:scale-105 mb-2 ml-3">
                  <CgProfile /> My Profile
                </Link>
              </div>
            )}
          </div>

          {/* Logout */}
          {user && (
            <Link
              to="/auth/login"
              onClick={handlelogOut}
              className="hidden md:flex items-center justify-center px-4 py-1.5 border-2 border-purple-500 text-purple-500 rounded-lg text-sm font-bold hover:bg-purple-500 hover:text-white transition-colors whitespace-nowrap"
            >
              Logout
            </Link>
          )}

          {/* Mobile Menu Icon */}
          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            <MdMenu />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setMenuOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-2/3 sm:w-1/2 bg-white shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} className="text-2xl">✕</button>
        </div>

        <div className="flex flex-col items-start gap-5 px-6 mt-4 text-lg">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
          <NavLink to="/addhabit" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Add Habit</NavLink>
          <NavLink to="/features" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>My Habits</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Public Habits</NavLink>

          {!user && (
            <Link to="/auth/login" className="btn btn-outline btn-primary w-full">
              Login
            </Link>
          )}

          
          {/* SIGNUP BUTTON */}
           {!user && (
            <Link to="/auth/signup" className="btn btn-error w-full">
              Signup
            </Link>
          )}

          {user && (
            <Link to='/auth/login'
              onClick={() => { handlelogOut(); setMenuOpen(false); }}
              className="btn btn-dash btn-secondary w-full"
            >
              Logout
            </Link>
          )}
        </div>
      </div>

    </div>
  );
};

export default Navbar;