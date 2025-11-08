/* eslint-disable no-unused-vars */
import React, { use, useState } from "react";
import Container from "./Container";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import logo from '../assets/Images/Logo.png'

const Navbar = () => {


  // all nav links is here
  const Links = (
    <>
      <NavLink to="/">
        <li className="hover:text-primary transition cursor-pointer font-semibold text-lg">
          Home
        </li>
      </NavLink>

      <NavLink to="/events">
        <li className="hover:text-primary transition cursor-pointer font-semibold text-lg">
          Events
        </li>
      </NavLink>
    </>
  );

  // buttons with user validation
  const buttons = (
    <>
      
        {/* <button
          
          className="px-5 py-2.5 hover-eff cursor-pointer bg-gradient transition flex items-center gap-2 text-white font-semibold rounded-full"
        >
          Log Out
        </button> */}
     
        <div className="flex gap-3 items-center">
          <Link to="/login">
            <button className="px-5 py-2.5 hover-eff cursor-pointer bg-gradient transition flex items-center gap-2 text-white font-semibold rounded-full">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-5 py-2.5 hover-eff cursor-pointer bg-gradient transition flex items-center gap-2 text-white font-semibold rounded-full">
              Register
            </button>
          </Link>
        </div>
      
    </>
  );

  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full">
      <Container>
        <div className="mx-auto flex justify-between items-center h-16 my-4 border-b border-b-primary pb-5">
          <div className="flex items-center gap-2">
            <NavLink to="/">
              <img src={logo} alt="Logo" className="w-full h-38" />
            </NavLink>
          </div>

          <ul className="hidden md:flex items-center gap-8  font-medium">
            {Links}
          </ul>

          {/* button  */}
          <div className="hidden md:flex items-center gap-4">{buttons}</div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-700"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
            <ul className="flex flex-col items-center gap-4 py-6 text-gray-700 font-medium">
              {Links}

              {/* button  */}
              {buttons}
            </ul>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;