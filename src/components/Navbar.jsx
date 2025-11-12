/* eslint-disable no-unused-vars */
import React, { use, useState } from "react";
import Container from "./Container";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import logo from "../assets/Images/Logo.png";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log Out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then((res) => {})
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: err,
              showConfirmButton: false,
              timer: 1500,
            });
          });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "loged out successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

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

      <NavLink to="/upcomingEvents">
        <li className="hover:text-primary transition cursor-pointer font-semibold text-lg">
          Upcoming Events
        </li>
      </NavLink>
    </>
  );

  // buttons with user validation
  const buttons = (
    <>
      {user ? (
        <button
          onClick={handleLogOut}
          className="px-5 py-2.5 hover-eff cursor-pointer bg-gradient transition flex items-center gap-2 text-white font-semibold rounded-full"
        >
          Log Out
        </button>
      ) : (
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
      )}
    </>
  );

  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full">
      <Container>
        <div
          className="mx-auto flex justify-between items-center
         h-18 py-5"
        >
          <div className="flex items-center gap-2">
            <NavLink to="/">
              <img src={logo} alt="Logo" className="w-full h-16" />
            </NavLink>
          </div>

          <ul className="hidden md:flex justify-center items-center gap-8  font-medium">
            {Links}
          </ul>

          {/* button  */}
          <div className="hidden md:flex items-center justify-center gap-4">
            <ThemeToggle></ThemeToggle>
            {user && (
              <div>
                <div className="dropdown dropdown-end ">
                  <div tabIndex={0} role="button" className="mt-3">
                    <img
                      title={user?.displayName}
                      src={user?.photoURL}
                      alt={user?.displayName}
                      className="rounded-full bg-secondary w-12 h-12 cursor-pointer"
                    />
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu rounded-box
                     z-10 w-52 p-3 font-semibold bg-secondary shadow-sm  py-3"
                  >
                    <NavLink to="/createEvent">
                      <li className="hover:bg-primary hover:text-white p-2 rounded-xl">
                        Create an Event
                      </li>
                    </NavLink>
                    <NavLink to="/joinedEvents">
                      <li className="hover:bg-primary hover:text-white p-2 rounded-xl">
                        Joined Events
                      </li>
                    </NavLink>

                    <NavLink to="/manageEvents">
                      <li className="hover:bg-primary hover:text-white p-2 rounded-xl">
                        Manage Events
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </div>
            )}
            {buttons}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-700"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-gray-100 shadow-sm">
            <ul className="flex flex-col items-center gap-4 py-6  font-medium">
              {Links}

              <div className="flex gap-2 items-center">
                <ThemeToggle></ThemeToggle>
                {/* profile pic with dropdown menu */}
                {user&& (<div className="dropdown dropdown-center">
                  <div tabIndex={0} role="button" className="mt-3">
                    <img
                      title={user?.displayName}
                      src={user?.photoURL}
                      alt={user?.displayName}
                      className="rounded-full bg-secondary w-12 h-12 mb-2 cursor-pointer"
                    />
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu rounded-box bg-black text-white
                     z-10 w-52 p-3 font-semibold  shadow-sm  py-3"
                  >
                    <NavLink to="/createEvent">
                      <li className="hover:bg-secondary p-2 rounded-xl">
                        Create an Event
                      </li>
                    </NavLink>
                    <NavLink to="/joinedEvents">
                      <li className="hover:bg-secondary p-2 rounded-xl">
                        Joined Events
                      </li>
                    </NavLink>

                    <NavLink to="/manageEvents">
                      <li className="hover:bg-secondary p-2 rounded-xl">
                        Manage Events
                      </li>
                    </NavLink>
                  </ul>
                </div>)}

                {/* button  */}
                {buttons}
              </div>
            </ul>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
