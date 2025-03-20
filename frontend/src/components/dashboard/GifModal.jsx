import React from "react";

const GifModal = ({ isOpen, gifUrl, exerciseName, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
      onClick={onClose}
    >
      <div
        className="relative bg-base-100 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium">{exerciseName}</h3>
          <button className="btn btn-sm btn-circle" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="p-4 flex justify-center">
          <img
            src={gifUrl}
            alt={exerciseName}
            className="max-h-[70vh] object-contain"
          />
        </div>
        <div className="p-4 border-t flex justify-end">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GifModal;
