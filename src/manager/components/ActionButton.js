import React from "react";

const ActionButton = ({ status, onStart, onAbort, onRestart }) => {
  let config = {
    label: "--",
    className: "bg-gray-300 cursor-not-allowed",
    disabled: true,
    onClick: null,
  };

  switch (status) {
    case "pending":
      config = {
        label: "Start",
        className: "bg-green-600 hover:bg-green-700",
        disabled: false,
        onClick: onStart,
      };
      break;

    case "processing":
      config = {
        label: "Abort",
        className: "bg-red-600 hover:bg-red-700",
        disabled: false,
        onClick: onAbort,
      };
      break;

    case "aborted":
      config = {
        label: "Restart",
        className: "bg-blue-600 hover:bg-blue-700",
        disabled: false,
        onClick: onRestart,
      };
      break;

    case "completed":
      config = {
        label: "Completed",
        className: "bg-gray-400 cursor-not-allowed",
        disabled: true,
        onClick: null,
      };
      break;

    default:
      break;
  }

  return (
    <button
      disabled={config.disabled}
      onClick={config.onClick}
      className={`text-xs px-2 py-1 rounded text-white ${config.className}`}
    >
      {config.label}
    </button>
  );
};

export default ActionButton;
