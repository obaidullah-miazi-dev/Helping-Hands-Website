/* eslint-disable no-unused-vars */
import { use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

export default function Register() {
  const { googleLogIn, createUser, setLoading, setUser, updateUser } =
    use(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passValidationRegEx = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passValidationRegEx.test(password)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          "Password must contain at least 1 uppercase, 1 lowercase and 6 characters",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        updateUser({
          displayName,
          photoURL,
        })
          .then(() => {
            setUser({ ...user, displayName, photoURL });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Account created successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            const err = error.code;
            Swal.fire({
              position: "center",
              icon: "error",
              title: { err },
              showConfirmButton: false,
              timer: 1500,
            });
            setUser(user);
          });
      })
      .catch((error) => {
        const err = error.code;
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${err}`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .finally(() => {
        navigate(`${location?.state ? location?.state : "/"}`),
          setLoading(false);
      });
  };

  const handleGoogleSignUp = () => {
    googleLogIn()
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged In successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(`${location?.state ? location?.state : "/"}`);
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <>
      <title>Register</title>
      <div className="flex items-center justify-center min-h-screen  p-4">
        <div className="w-full max-w-md  rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center  mb-2">
            Register Now!
          </h1>
          <p className="text-center text-sm  mb-6">
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
              <label htmlFor="name" className="block text-sm font-medium  mb-1">
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
            <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium  mb-1"
              >
                Photo URL
              </label>
              <input
                type="url"
                id="photoURL"
                name="photo"
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium  mb-1"
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
              className="w-full bg-gradient hover-eff text-white font-semibold py-3 rounded-lg cursor-pointer transition duration-200 shadow-md"
            >
              Register
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <div className="border-t border-gray-300 grow"></div>
            <span className="px-4 text-sm  ">OR</span>
            <div className="border-t border-gray-300 grow"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignUp}
            type="button"
            className="mt-6 w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 font-medium hover:bg-gray-50 transition cursor-pointer"
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
    </>
  );
}
