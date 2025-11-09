/* eslint-disable no-unused-vars */
import { use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

export default function Register() {
  const { googleLogIn, createUser, setLoading } = use(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    createUser(email, password)
      .then((data) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Account Created Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: errorCode,
          showConfirmButton: false,
          timer: 2000,
        });
      });
    setLoading(false);
  };

  const handleGoogleSignUp = () => {
    googleLogIn()
      .then((res) => {
        // console.log(res.user)

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged In successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Register Now!
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          Already have an account?{" "}
          <Link to="/login">
            <li className="text-primary hover:underline font-medium list-none inline">
              Login Now
            </li>
          </Link>
        </p>

        <form className="space-y-5" onSubmit={handleRegister}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              required
              placeholder="Your Name"
            />
          </div>

          {/* Image URL */}
          {/* <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              placeholder="https://example.com/avatar.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
          </div> */}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
              className="block text-sm font-medium text-gray-700 mb-1"
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
            className="w-full bg-gradient hover-eff text-white font-semibold py-3 rounded-lg cursor-pointer transition duration-200 shadow-md"
          >
            Register
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <div className="border-t border-gray-300 grow"></div>
          <span className="px-4 text-sm text-gray-500 bg-white">OR</span>
          <div className="border-t border-gray-300 grow"></div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignUp}
          type="button"
          className="mt-6 w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 transition cursor-pointer"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          Sign Up With Google
        </button>
      </div>
    </div>
  );
}