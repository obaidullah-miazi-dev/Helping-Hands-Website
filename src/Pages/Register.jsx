/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { Users, Heart, ArrowRight } from "lucide-react";
import logoIcon from '../assets/Images/Logo-Icon.png'

export default function Register() {
  const { googleLogIn, createUser, updateUser,setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation()

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Must have 1 uppercase, 1 lowercase, and 6+ characters",
        timer: 2000,
      });
      return;
    }

    createUser(email, password)
      .then((res) => {
        return updateUser({ displayName: name, photoURL: photo }).then(() => res.user);
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Welcome to Helping Hands!",
          timer: 2000,
        });
         navigate(`${location?.state ? location?.state : "/"}`);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.code,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(()=> setLoading(false))
  };

  const handleGoogleSignUp = () => {
    googleLogIn()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Signed Up with Google!",
          showConfirmButton: false,
          timer: 2000,
        });
         navigate(`${location?.state ? location?.state : "/"}`);
      })
      .catch((err) => {
        Swal.fire({ icon: "error", title: err.message, timer: 1500 });
      })
      .finally(()=> setLoading(false))
  };

  return (
    <>
      <title>Register | Helping Hands</title>
      <div className="min-h-screen flex items-center justify-center p-4 mt-12 md:mt-0">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 lg:gap-12 items-center">


          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl shadow-xl border-2 border-secondary order-2 md:order-1"
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              Create Your Account
            </h2>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Photo URL (Optional)</label>
                <input
                  type="url"
                  name="photo"
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient hover-eff cursor-pointer text-white font-bold py-3.5 rounded-lg shadow-md transition transform"
              >
                Register Now
              </button>
            </form>

            <div className="my-5 flex items-center">
              <div className="flex-1 border-t border-gray-300 "></div>
              <span className="px-3 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 cursor-pointer rounded-lg py-3 px-4 font-medium hover:bg-gray-50  transition"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Sign Up with Google
            </button>

            <p className="text-center mt-5 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Login Here <ArrowRight className="inline w-4 h-4" />
              </Link>
            </p>
          </motion.div>



          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-center md:text-right order-1 md:order-2"
          >
            <div className="flex justify-center md:justify-end">
              <img src={logoIcon} alt="Logo" className="w-18" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Join the Movement
            </h1>
            <p className="text-lg font-medium">
              Be part of a community that creates real impact — one event at a time.
            </p>
            <div className="flex items-center justify-center md:justify-end gap-2 text-primary font-semibold">
              <Users size={20} />
              <span>10,000+ volunteers already helping</span>
            </div>
            <p className="text-sm">
              Create an account and start making a difference today.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}