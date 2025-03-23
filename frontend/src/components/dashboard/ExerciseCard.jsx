import React, { useState } from "react";
import GifModal from "./GifModal";
import InstructionsModal from "./InstructionsModal";

const ExerciseCard = ({ exercise }) => {
  const [showGifModal, setShowGifModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  return (
    <>
      <div className="card bg-base-100 shadow hover:shadow-md transition-shadow duration-300">
        <div className="card-body p-4">
          <div className="flex items-center gap-4">
            <div className="avatar placeholder"></div>
            <div>
              <h2 className="card-title text-lg">{exercise.name}</h2>
              <div className="badge badge-primary mt-1">
                {exercise.bodyPart || "No category"}
              </div>
            </div>
          </div>

          {exercise.gifUrl && (
            <div className="mt-3 relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  className="object-cover object-center w-full h-full"
                />
              </div>
            </div>
          )}

          {exercise.instructions && exercise.instructions.length > 0 ? (
            <>
              <div className="text-sm hidden md:block">
                <ol className="list-decimal ml-4">
                  {exercise.instructions.map((instruction, idx) => (
                    <li key={idx}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </>
          ) : (
            <div className="text-sm">No description available</div>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            <div className="badge badge-outline badge-sm">
              {exercise.equipment || "No equipment"}
            </div>
            <div className="badge badge-outline badge-sm">
              {exercise.target || "No specific target"}
            </div>
          </div>

          <div className="flex gap-2">
            {exercise.gifUrl && (
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setShowGifModal(true)}
              >
                View GIF
              </button>
            )}
            <div className="text-sm block md:hidden">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setShowInstructionsModal(true)}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <GifModal
        isOpen={showGifModal}
        gifUrl={exercise.gifUrl}
        exerciseName={exercise.name}
        onClose={() => setShowGifModal(false)}
      />

      <InstructionsModal
        isOpen={showInstructionsModal}
        instructions={exercise.instructions}
        exerciseName={exercise.name}
        onClose={() => setShowInstructionsModal(false)}
      />
    </>
  );
};

export default ExerciseCard;
