import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { NavLink } from "react-router";
import logo from "../assets/Images/Logo.png";

const Footer = () => {
  return (
    <footer
      className="bg-linear-to-b from-[#f3ffe6] to-[#e0ffbc] border-t-2
     border-secondary mt-20"
    >
      <div className="container mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-8">
          <div className="space-y-4">
            <NavLink to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-20" />
            </NavLink>
            <p className="text-gray-600 font-medium max-w-xs">
              Connecting communities through meaningful events, workshops, and
              volunteer opportunities.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-[#d2efa7] rounded-full
                 hover:bg-primary hover:text-white transition"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#d2efa7] rounded-full
                 hover:bg-primary hover:text-white transition"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#d2efa7] rounded-full
                 hover:bg-primary hover:text-white transition"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2 font-medium text-gray-700">
              <li>
                <NavLink to="/" className="hover:text-primary transition">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" className="hover:text-primary transition">
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/upcomingEvents"
                  className="hover:text-primary transition"
                >
                  Upcoming
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/createEvent"
                  className="hover:text-primary transition"
                >
                  Create Event
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Contact Us</h3>
            <ul className="space-y-3 font-medium text-gray-700">
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-primary" />
                <span>support@helpinghands.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-primary" />
                <span>+880 123 456 789</span>
              </li>
            </ul>
          </div>
        </div>


        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 font-medium">
            © {new Date().getFullYear()}
            <span className="text-primary font-bold"> Helping Hands </span>. All
            rights reserved.
            <br />{" "}
            <span className="block sm:inline sm:ml-2 text-sm">
              Developed By{" "}
              <a href="https://www.linkedin.com/in/obaidullah-miazi" target="_blank">
                <span className="text-primary hover:underline">
                  Obaidullah Miazi
                </span>
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
