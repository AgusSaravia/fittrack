import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ErrorDisplay from "../components/dashboard/ErrorDisplay";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
    location: "",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Error fetching profile data");
        }
        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    if (token) {
      fetchProfile();
    } else {
      setError("You are not logged in. Please login.");
      setLoading(false);
    }
  }, [token, apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setEditing(!editing);
    setMessage("");
    setError("");
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });
      if (!response.ok) {
        throw new Error("Error saving profile");
      }
      setMessage("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (!token) {
    return (
      <ErrorDisplay
        action={"Login"}
        error={error}
        onRetry={() => navigate("/login")}
      />
    );
  }

  return (
    <div className="container mx-auto p-6">
      {message && <div className="alert alert-success mb-4">{message}</div>}
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <div className="flex flex-col items-center p-4">
          {profile.profilePicture ? (
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="w-48 h-48 object-cover rounded-full"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded-full">
              <span className="text-6xl text-gray-500">
                {profile.name.charAt(0)}
              </span>
            </div>
          )}
          {editing && (
            <div className="mt-4">
              <label className="btn btn-sm btn-outline">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
        <div className="card-body">
          <h2 className="card-title text-2xl">My Profile</h2>
          {editing ? (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name:</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email:</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="input input-bordered"
                  disabled
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio:</span>
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="textarea textarea-bordered"
                  rows="3"
                ></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone:</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location:</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={toggleEdit}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                <span className="font-bold">Name:</span> {profile.name}
              </p>
              <p>
                <span className="font-bold">Email:</span> {profile.email}
              </p>
              <p>
                <span className="font-bold">Bio:</span>{" "}
                {profile.bio || "No bio available"}
              </p>
              <p>
                <span className="font-bold">Phone:</span>{" "}
                {profile.phone || "Not provided"}
              </p>
              <p>
                <span className="font-bold">Location:</span>{" "}
                {profile.location || "Not provided"}
              </p>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary" onClick={toggleEdit}>
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
