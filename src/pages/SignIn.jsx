import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignIn = () => {
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

  if (user && user?.email) {
    return <Navigate to={"/"} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-20 px-4 md:px-0 bg-gradient-to-r from-primary to-accent">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md bg-base-200">
        <h2 className="text-2xl font-bold text-center">
          Sign in to Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
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
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
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
  );
};

export default SignIn;
