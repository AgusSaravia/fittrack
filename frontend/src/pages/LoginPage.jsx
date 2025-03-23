import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.token, null);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100-to-br from-zinc-100 to-black flex items-center justify-center py-20">
      <div className="bg-zinc-150 rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full mx-4">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-12 flex flex-col justify-center items-start">
            <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="input input-bordered"
                  required
                />
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
            <p className="text-sm text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="link link-primary">
                Register
              </Link>
            </p>
          </div>
          <div className="hidden md:block relative">
            <img
              src="./loginPage.webp"
              alt="Fitness"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
