import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080/api";

const generateTempId = () =>
  `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const WorkoutForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingWorkout, setLoadingWorkout] = useState(isEditMode);

  const [selectedExercises, setSelectedExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);

  const availableCategories = [
    "all",
    "back",
    "cardio",
    "chest",
    "lower arms",
    "lower legs",
    "neck",
    "shoulders",
    "upper arms",
    "upper legs",
    "waist",
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (isEditMode) {
      const fetchWorkout = async () => {
        setLoadingWorkout(true);
        try {
          const response = await fetch(`${API_BASE_URL}/workouts/${id}`);

          if (!response.ok) {
            throw new Error("Error fetching workout");
          }

          const workout = await response.json();

          setWorkoutName(workout.name);

          setSelectedExercises(
            workout.exercises.map((ex) => ({
              _id: ex._id || generateTempId(),
              name: ex.name,
              bodyPart: ex.muscleGroup,
              equipment: ex.equipment || "",
            }))
          );
          setLoadingWorkout(false);
        } catch (err) {
          console.error("Error fetching workout:", err);
          setError("Couldn't load workout to edit. " + err.message);
          setLoadingWorkout(false);
        }
      };

      fetchWorkout();
    }
  }, [id, isEditMode]);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        let url = `${API_BASE_URL}/exercises`;

        if (selectedCategory !== "all") {
          url = `${url}/${selectedCategory}`;
        }

        url = `${url}?limit=${limit}&page=${currentPage}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error fetching exercises");
        }
        const data = await response.json();
        setExercises(data.exercises);
        setTotalPages(data.totalPages);
        setHasNextPage(data.hasNextPage);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExercises();
    if (currentPage !== 1 && (selectedCategory !== "all" || limit !== 10)) {
      setCurrentPage(1);
    }
  }, [limit, currentPage, selectedCategory]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(Number(newLimit));
    setCurrentPage(1);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
  };

  const toggleExerciseSelection = (exercise) => {
    const exerciseId = String(exercise._id);

    if (selectedExercises.some((ex) => String(ex._id) === exerciseId)) {
      setSelectedExercises(
        selectedExercises.filter((ex) => String(ex._id) !== exerciseId)
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const validateWorkoutName = (name) => {
    setWorkoutName(name);

    if (!name.trim()) {
      setNameError("Workout name must not be empty");
      return false;
    } else if (name.length > 50) {
      setNameError("Workout name cannot be longer than 50 characters");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };

  const handleSubmitWorkout = async (e) => {
    e.preventDefault();

    if (selectedExercises.length === 0) {
      alert("You have to select at least one exercise");
      return;
    }

    if (!validateWorkoutName(workoutName)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const workoutData = {
        name: workoutName,
        exercises: selectedExercises.map((ex) => ({
          name: ex.name,
          muscleGroup: ex.bodyPart,
          equipment: ex.equipment || "",
        })),
      };

      const url = isEditMode
        ? `${API_BASE_URL}/workouts/${id}`
        : `${API_BASE_URL}/workouts`;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workoutData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            (isEditMode ? "Error updating workout" : "Error creating workout")
        );
      }

      setActionSuccess(true);

      setTimeout(() => {
        setActionSuccess(false);

        if (isEditMode) {
          navigate("/workouts");
        } else {
          setSelectedExercises([]);
          setWorkoutName("");
        }
      }, 3000);
    } catch (err) {
      console.error(err);
      alert(
        `Error at ${isEditMode ? "updating" : "creating"}  workout: ${
          err.message
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    if (isEditMode) {
      navigate(0);
    } else {
      setLoading(true);
      setCurrentPage(1);
    }
  };

  if ((loading && !isEditMode) || (isEditMode && loadingWorkout)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loading loading-spinner loading-lg"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  if (error && !selectedExercises.length) {
    return (
      <div className="container mx-auto px-4 mt-8">
        <div className="alert alert-error flex flex-col items-center">
          <p>{error}</p>
          <div className="mt-4">
            <button onClick={handleRetry} className="btn btn-primary mr-2">
              Retry
            </button>
            <button
              onClick={() => navigate("/workouts")}
              className="btn btn-outline"
            >
              Routines
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container  px-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Workout" : "Create Your Workout"}
      </h1>

      <div className="mb-8 bg-base-200 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Selected Exercises ({selectedExercises.length})
        </h2>

        {selectedExercises.length > 0 ? (
          <div className="mb-4">
            <ul className="list-disc list-inside">
              {selectedExercises.map((ex) => (
                <li
                  key={ex._id}
                  className="flex justify-between items-center mb-2"
                >
                  <span>
                    <strong>{ex.name}</strong> - {ex.bodyPart}
                  </span>
                  <button
                    className="btn btn-sm btn-error btn-outline"
                    onClick={() => toggleExerciseSelection(ex)}
                    type="button"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 mb-4">
            You haven't selected any exercises yet. Select exercises from the
            dropdown menu.
          </p>
        )}

        <form onSubmit={handleSubmitWorkout} className="mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Workout Name</span>
            </label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => validateWorkoutName(e.target.value)}
              className={`input input-bordered w-full ${
                nameError ? "input-error" : ""
              }`}
              placeholder="Enter a name for your workout"
              disabled={selectedExercises.length === 0 || isSubmitting}
              maxLength={50}
            />
            {nameError && (
              <label className="label">
                <span className="label-text-alt text-error">{nameError}</span>
              </label>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-4 w-full"
            disabled={
              selectedExercises.length === 0 ||
              !workoutName.trim() ||
              isSubmitting ||
              nameError
            }
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : isEditMode ? (
              "Update Workout"
            ) : (
              "Create Workout"
            )}
          </button>

          {actionSuccess && (
            <div className="alert alert-success mt-4">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                {isEditMode
                  ? "Workout updated successfully!"
                  : "Workout created successfully!"}
              </span>
            </div>
          )}

          {isEditMode && (
            <button
              type="button"
              className="btn btn-outline mt-4 w-full"
              onClick={() => navigate("/workouts")}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">Available Exercises</h2>

      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div>
          <label className="mr-2 font-medium">Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="select select-bordered"
          >
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2 font-medium">Items per page:</label>
          <select
            value={limit}
            onChange={(e) => handleLimitChange(e.target.value)}
            className="select select-bordered"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {exercises.length > 0 ? (
          exercises.map((ex) => {
            const isSelected = selectedExercises.some(
              (selected) => String(selected._id) === String(ex._id)
            );
            return (
              <div
                key={ex._id}
                className={`p-4 rounded shadow cursor-pointer ${
                  isSelected ? "bg-primary text-primary-content" : "bg-base-200"
                }`}
                onClick={() => toggleExerciseSelection(ex)}
              >
                <h2 className="font-medium">{ex.name}</h2>
                <p
                  className={`text-xs ${
                    isSelected ? "text-primary-content" : "text-gray-500"
                  }`}
                >
                  {ex.bodyPart}
                </p>
                {isSelected && (
                  <div className="mt-2 text-xs font-semibold">✓ Selected</div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-4 text-center">
            <p>No exercises match the selected category.</p>
          </div>
        )}
      </div>

      <div className="pagination mt-6 flex justify-center gap-4 items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="btn"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkoutForm;
