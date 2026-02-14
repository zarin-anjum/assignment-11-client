import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Register = () => {
  const { createUser, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const getFriendlyError = (error) => {
    const code = error.code || "";
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password is too weak. Use at least 6 characters.";
      default:
        return "Registration failed. Please try again.";
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Password validation
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    if (!uppercase || !lowercase || password.length < 6) {
      toast.error(
        "Password must include uppercase, lowercase letters, and at least 6 characters.",
        {
          style: {
            borderRadius: "10px",
            background: "#FEE2E2",
            color: "#B91C1C",
          },
        },
      );
      setLoading(false);
      return;
    }

    try {
      const result = await createUser(email, password);

      // Update profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      });

      toast.success("Registration successful!", {
        style: {
          borderRadius: "10px",
          background: "#DCFCE7",
          color: "#166534",
        },
      });
      e.target.reset();
      navigate("/");
    } catch (err) {
      console.log("Firebase registration error:", err);
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
    try {
      await googleLogin();
      toast.success("Logged in with Google!", {
        style: {
          borderRadius: "10px",
          background: "#DCFCE7",
          color: "#166534",
        },
      });
      navigate("/");
    } catch (err) {
      const message = getFriendlyError(err);
      toast.error(message, {
        style: {
          borderRadius: "10px",
          background: "#FEE2E2",
          color: "#B91C1C",
        },
      });
    }
  };

  return (
    <div className="lg:min-h-screen p-12 flex justify-center items-center bg-green-100">
      <Helmet>
        <title>ContestHub – Registration</title>
      </Helmet>
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-lg md:text-2xl font-semibold text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-2 md:space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute top-2 right-2 text-gray-500"
            ></button>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 underline">
            Login
          </Link>
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
