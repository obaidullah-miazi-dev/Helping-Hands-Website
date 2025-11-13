/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import {  ArrowRight, Sparkles } from "lucide-react";
import logoIcon from '../assets/Images/Logo-Icon.png'

export default function Login() {
  const { googleLogIn, signInUser,setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged In Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.code,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(()=>navigate(`${location?.state ? location?.state : "/"}`), setLoading(false))
  };

  const handleGoogleSignIn = () => {
    googleLogIn()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged In Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .finally(()=>navigate(`${location?.state ? location?.state : "/"}`), setLoading(false))
  };

  return (
    <>
      <title>Login | Helping Hands</title>
      <div className="min-h-screen flex items-center justify-center p-4 mt-12 md:mt-0">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-center md:text-left"
          >
            <div className="flex justify-center md:justify-start">
              <img src={logoIcon} alt="Logo" className="w-18" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Welcome Back!
            </h1>
            <p className="text-lg  font-medium">
              Join thousands of volunteers making a real difference in communities.
            </p>
            <div className="flex items-center gap-2 justify-center md:justify-start text-primary font-semibold">
              <Sparkles size={20} />
              <span>Login to create or join events</span>
              <Sparkles size={20} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              New here? Let's get started!
            </p>
          </motion.div>


          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl shadow-xl border-2 border-secondary"
          >
            <h2 className="text-3xl font-bold text-center mb-6 ">
              Login to Your Account
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300  focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient hover-eff cursor-pointer text-white font-bold py-3 rounded-lg shadow-md transition transform"
              >
                Login Now
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t"></div>
              <span className="px-3 text-sm ">OR</span>
              <div className="flex-1 border-t"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 font-medium hover:bg-gray-50 cursor-pointer transition"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>

            <p className="text-center mt-6 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Register Now <ArrowRight className="inline w-4 h-4" />
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}