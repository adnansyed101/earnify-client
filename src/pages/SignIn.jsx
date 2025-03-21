import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import loginImg from "../assets/login.svg";

const SignIn = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { user, login, setUser, createUserWithGoogle, loading, setLoading } =
    useAuth();

  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Earnify | Sign In";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Yay! Logged in.");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    createUserWithGoogle()
      .then((res) => {
        const user = res.user;
        setUser(user);
        axiosPublic.post(`/user/${user.email}`, {
          name: user.displayName,
          image: user.photoURL,
          email: user.email,
          role: "Worker",
          coin: 10,
        });
        navigate("/");
        toast.success("Login Succesfull.");
      })
      .catch((err) => {
        const errorCode = err.code;
        toast.error(errorCode);
        setLoading(false);
        navigate("/signin");
      });
  };

  const handleRolebutton = (role) => {
    if (role === "Worker") {
      setLoginData({ email: "johndoe@gmail.com", password: "Somepass1" });
    } else if (role === "Buyer") {
      setLoginData({ email: "sirgeant2@gmail.com", password: "Somepass1" });
    } else {
      setLoginData({ email: "jonahjameson@gmail.com", password: "Somepass1" });
    }
  };

  if (user && user?.email) {
    return <Navigate to={"/"} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="flex items-center justify-center min-h-screen py-20 px-4 md:px-0 bg-gradient-to-r from-primary to-accent">
      <div className="bg-base-200  p-8 rounded-lg shadow-md md:flex gap-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Earnify</h2>
          <p>The Micro task earning platform for you.</p>
          <figure>
            <img src={loginImg} alt="Login Image" />
          </figure>
        </div>
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            Sign in to Your Account
          </h2>
          <p>
            Want to try it out ?{" "}
            <button
              className="bg-primary inline-block rounded border border-transparent py-1 px-2.5 text-xs font-medium text-white"
              onClick={() => handleRolebutton("Worker")}
            >
              Worker
            </button>{" "}
            <button
              className="bg-primary inline-block rounded border border-transparent py-1 px-2.5 text-xs font-medium text-white"
              onClick={() => handleRolebutton("Buyer")}
            >
              Buyer
            </button>{" "}
            <button
              className="bg-primary inline-block rounded border border-transparent py-1 px-2.5 text-xs font-medium text-white"
              onClick={() => handleRolebutton("Admin")}
            >
              Admin
            </button>
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={loginData.email}
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value });
                }}
                placeholder="Enter your email"
                className="input input-bordered input-primary w-full"
                required
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                }}
                placeholder="Enter your password"
                className="input input-bordered input-primary w-full"
                required
              />
            </div>
            <p className="mt-2 text-sm">
              Do not have an account?{" "}
              <Link to="/signup" className="text-secondary">
                Sign Up
              </Link>
            </p>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          <div className="divider">OR</div>
          <button
            type="button"
            className="btn btn-secondary btn-outline btn-block"
            onClick={handleGoogleLogin}
          >
            <FaGoogle />
            Login with Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
