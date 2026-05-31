import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Helmet } from "react-helmet";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen text-center p-4 bg-linear-to-b from-gray-50 to-green-50">
        <Helmet>
          <title>ContestHub – Home</title>
        </Helmet>
        <img src="/assets/error.jpg" alt="Error" className="w-auto h-88" />
        <h2 className="text-4xl font-bold mb-4 text-gray-800 mt-4">Oops!</h2>
        <p className="text-lg text-gray-600 mb-4">
          {error?.statusText ||
            "The page you are looking for is not available."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white rounded-lg font-semibold transition"
        >
          Go Back!
        </button>
        <p className="text-gray-500 mt-2">
          Redirecting to home in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
