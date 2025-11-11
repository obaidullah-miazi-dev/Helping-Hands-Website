/* eslint-disable no-unused-vars */
import { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

export default function Login() {
  const { googleLogIn, setLoading, signInUser } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInUser(email, password)
      .then((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged In Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(`${location?.state ? location?.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        Swal.fire({
          position: "center",
          icon: "error",
          title: errorCode,
          showConfirmButton: false,
          timer: 2000,
        });
      });
    setLoading(false);
  };

  const handleGoogleSignIn = () => {
    googleLogIn()
      .then((res) => {
        // console.log(res.user)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged In Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(`${location?.state ? location?.state : "/"}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="w-full max-w-md rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-4">Login Now!</h1>
        <p className="text-center text-sm  mb-6">
          Don't have an account?{" "}
          <Link to="/register">
            <li className="text-primary hover:underline font-medium list-none inline">
              Register Now
            </li>
          </Link>
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium  mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              required
              placeholder="Your Email"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium  mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              required
              placeholder="Your Password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient  font-semibold py-3 rounded-lg hover-eff cursor-pointer transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <div className="border-t border-gray-300 grow"></div>
          <span className="px-4 text-sm  ">OR</span>
          <div className="border-t border-gray-300 grow"></div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="mt-6 w-full flex items-center
           justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4
             font-medium hover:bg-gray-50 transition cursor-pointer"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          Sign In With Google
        </button>
      </div>
    </div>
  );
}
