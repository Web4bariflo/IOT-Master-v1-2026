const ActionButton = ({ status, disabled, onSubmit, onAbort, onRestart }) => {
  if (status === "completed") {
    return (
      <button
        disabled
        className="px-4 py-1 rounded-md bg-gray-300 text-gray-600 cursor-not-allowed"
      >
        Completed
      </button>
    );
  }

  if (status === "aborted") {
    return (
      <button
        onClick={onRestart}
        disabled={disabled}
        className={`px-4 py-1 rounded-md text-white ${
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-yellow-500 hover:bg-yellow-600"
        }`}
      >
        Restart
      </button>
    );
  }

  if (status === "processing") {
    return (
      <button
        onClick={onAbort}
        disabled={disabled}
        className={`px-4 py-1 rounded-md text-white ${
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        Abort
      </button>
    );
  }

  // idle / active
  return (
    <button
      onClick={onSubmit}
      disabled={disabled}
      className={`px-4 py-1 rounded-md text-white ${
        disabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-green-600 hover:bg-sky-600"
      }`}
    >
      Submit
    </button>
  );
};

export default ActionButton;
