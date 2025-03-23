import React from "react";

const InstructionsModal = ({ isOpen, instructions, exerciseName, onClose }) => {
  if (!isOpen) return null; // Do not render if modal is not open

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{exerciseName} Instructions</h3>
        <div className="py-4">
          {instructions && instructions.length > 0 ? (
            <ol className="list-decimal ml-4">
              {instructions.map((instruction, idx) => (
                <li key={idx}>{instruction}</li>
              ))}
            </ol>
          ) : (
            <p>No instructions available</p>
          )}
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
