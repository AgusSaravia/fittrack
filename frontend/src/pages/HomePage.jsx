import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className="text-white min-h-screen bg-zinc-700-to-br flex items-center justify-center  px-1">
      <div
        className="bg-zinc-150 rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full md:bg-none"
        style={{
          backgroundImage: "url('./public/HomePage.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "block",
          width: "100%",
          height: "400px",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 sm:p-12 flex flex-col justify-center items-start bg-zinc-150/70 md:bg-transparent">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Track Your Fitness Journey
            </h1>
            <p className="text-lg mb-8">
              Achieve your goals with our easy-to-use workout and exercise
              tracker.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
              <Link
                to="/exercises"
                className="btn btn-primary btn-lg rounded-full"
              >
                Explore Exercises
              </Link>
              <Link
                to="/workouts"
                className="btn btn-accent btn-lg rounded-full"
              >
                Plan Workouts
              </Link>
            </div>
            {token ? (
              <div className="mt-8">
                <Link
                  to="/profile"
                  className="btn btn-outline btn-info rounded-full"
                >
                  My Profile
                </Link>
              </div>
            ) : (
              <div className=" py-6 flex flex-row sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="btn btn-outline btn-info rounded-full"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-outline btn-success rounded-full"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
