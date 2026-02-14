import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Login = () => {
  const { signIn, googleLogin } = useAuth();
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const getFriendlyError = (error) => {
    switch (error.code) {
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Try again!";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/user-disabled":
        return "This account has been disabled.";
      default:
        return "Login failed. Please try again.";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signIn(email, password);
      toast.success("Logged in successfully!", {
        style: {
          borderRadius: "10px",
          background: "#DCFCE7",
          color: "#166534",
        },
      });
      navigate(from, { replace: true });
    } catch (err) {
      const message = getFriendlyError(err);
      toast.error(message, {
        style: {
          borderRadius: "10px",
          background: "#FEE2E2",
          color: "#B91C1C",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Logged in with Google!", {
        style: {
          borderRadius: "10px",
          background: "#DCFCE7",
          color: "#166534",
        },
      });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google login failed. Try again.", {
        style: {
          borderRadius: "10px",
          background: "#FEE2E2",
          color: "#B91C1C",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:min-h-screen p-12 flex justify-center items-center bg-green-100">
      <Helmet>
        <title>ContestHub – Login</title>
      </Helmet>
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-lg md:text-2xl font-semibold text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border px-3 py-2 rounded-lg"
              required
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div className="text-right -mt-2">
            <Link
              to="/forget-password"
              state={{ email: emailInput }}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

          <button
            onClick={handleGoogleLogin}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Continue with Google
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Not registered yet?{" "}
          <Link to="/register" className="text-purple-600 underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
