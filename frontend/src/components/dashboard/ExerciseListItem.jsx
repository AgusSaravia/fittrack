import React, { useState } from "react";
import GifModal from "./GifModal";

const ExerciseListItem = ({ exercise }) => {
  const [showGifModal, setShowGifModal] = useState(false);

  return (
    <>
      <div className="card card-side bg-base-100 shadow hover:shadow-md transition-shadow duration-300">
        {exercise.gifUrl ? (
          <div className="relative w-24 md:w-36 overflow-hidden">
            <img
              src={exercise.gifUrl}
              alt={exercise.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                className="btn btn-xs btn-primary"
                onClick={() => setShowGifModal(true)}
              >
                View GIF
              </button>
            </div>
          </div>
        ) : (
          <div className="w-24 md:w-36 bg-gray-200 flex items-center justify-center">
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                <span className="text-lg">{exercise.name.charAt(0)}</span>
              </div>
            </div>
          </div>
        )}
        <div className="card-body p-4">
          <h2 className="card-title text-lg">{exercise.name}</h2>
          <div className="badge badge-primary inline-block">
            {exercise.bodyPart || "No category"}
          </div>
          <p className="text-sm line-clamp-2">
            {exercise.instructions || "No description available"}
          </p>
          <div className="card-actions justify-end">
            {exercise.gifUrl && (
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setShowGifModal(true)}
              >
                View GIF
              </button>
            )}
            <button className="btn btn-primary btn-sm">View details</button>
          </div>
        </div>
      </div>

      <GifModal
        isOpen={showGifModal}
        gifUrl={exercise.gifUrl}
        exerciseName={exercise.name}
        onClose={() => setShowGifModal(false)}
      />
    </>
  );
};

export default ExerciseListItem;
