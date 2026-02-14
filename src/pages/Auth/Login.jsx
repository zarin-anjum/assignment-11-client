import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("Login successful 🎉");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button className="btn btn-primary w-full">Login</button>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center gap-2"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
