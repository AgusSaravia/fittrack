import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const { login, loading, error } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData, rememberMe);
    } catch (error) {
      // Error is handled by the AuthContext
      console.error("Login error:", error);
    }
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold text-center">Login</h2>

        {error && (
          <div className="alert alert-error mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className="input input-bordered"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="input input-bordered"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label className="label">
              <Link
                to="/forgot-password"
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </Link>
            </label>
          </div>

          <div className="form-control mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="label-text">Remember me</span>
            </label>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
