import React, { useState } from "react";
import GifModal from "./GifModal";

const ExerciseListItem = ({ exercise }) => {
  const [showGifModal, setShowGifModal] = useState(false);

  return (
    <>
      <div className="card card-side bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {exercise.gifUrl ? (
          <div className="relative w-32 md:w-48 h-full overflow-hidden">
            <img
              src={exercise.gifUrl}
              alt={exercise.name}
              className="h-full w-full object-cover"
            />
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
        <div className="card-body p-5">
          <h2 className="card-title text-lg">{exercise.name}</h2>
          <div className="badge badge-primary inline-block">
            {exercise.bodyPart || "No category"}
          </div>
          <div className="text-sm md:text-base">
            {exercise.instructions && exercise.instructions.length > 0 ? (
              <ol className="list-decimal ml-4 md:ml-6 space-y-2">
                {exercise.instructions.map((instruction, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {instruction}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-center text-gray-500">
                No description available
              </p>
            )}
          </div>
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
