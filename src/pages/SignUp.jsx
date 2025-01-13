import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../components/Loading";

const SignUp = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showVerifyPwd, setShowVerifyPwd] = useState(false);
  const { user, createNewUser, setUser, updateUserProfile, loading } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "R&R | Sign Up";
    window.scrollTo(0, 0);
  }, []);

  const handleShowPwd = () => setShowPwd(!showPwd);
  const handleShowVerifyPwd = () => setShowVerifyPwd(!showVerifyPwd);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const photo = form.photoURL.value;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const verifyPassword = form.verifyPassword.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (password !== verifyPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!passwordRegex.test(password) || !passwordRegex.test(verifyPassword)) {
      toast.warn("Must have 1 Uppercase, 1 Lowercase and atleast 6 character.");
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            toast.success("Account Created Successfully.");
            navigate("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            toast.error(errorCode);
            navigate("/signUp");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (user && user?.email) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-50px)] py-20 px-4 md:px-0 bg-gradient-to-r from-primary to-accent">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md bg-base-200">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Photo URl */}
          <div>
            <label
              htmlFor="photoURL"
              className="block text-sm font-medium mb-1"
            >
              Photo URL
            </label>
            <input
              type="url"
              id="photoURL"
              name="photoURL"
              placeholder="Enter your photo URL"
              className="input input-bordered input-primary w-full"
              required
            />
          </div>
          {/* User Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered input-primary w-full"
              required
            />
          </div>
          {/* Email Adress */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium  mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered input-primary w-full"
              required
            />
          </div>
          {/* Enter Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium  mb-1"
            >
              Enter Password
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                name="password"
                type={showPwd ? "text" : "password"}
                className="grow"
                autoComplete="off"
                required
              />
              {showPwd ? (
                <FaEyeSlash onClick={handleShowPwd} />
              ) : (
                <FaEye onClick={handleShowPwd} />
              )}
            </label>
            <ul className="text-sm list-disc pl-5 mt-2">
              <li>Must be atleast 6 characters long.</li>
              <li>Must contain one uppercase and one lowercase</li>
            </ul>
          </div>
          {/* Verify Password */}
          <div>
            <label
              htmlFor="verifyPassword"
              className="block text-sm font-medium mb-1"
            >
              Verify Password
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                name="verifyPassword"
                type={showVerifyPwd ? "text" : "password"}
                className="grow"
                autoComplete="off"
                required
              />
              {showVerifyPwd ? (
                <FaEyeSlash onClick={handleShowVerifyPwd} />
              ) : (
                <FaEye onClick={handleShowVerifyPwd} />
              )}
            </label>
          </div>

          <p className="mt-2 text-sm">
            Already have an Account?{" "}
            <Link to="/signin" className="text-secondary">
              Sign In
            </Link>
          </p>
          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
