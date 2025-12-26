const ActionButton = ({ status, onSubmit, onAbort, onRestart }) => {
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
        className="px-4 py-1 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white"
      >
        Restart
      </button>
    );
  }

  if (status === "processing") {
    return (
      <button
        onClick={onAbort}
        className="px-4 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white"
      >
        Abort
      </button>
    );
  }

  // default → idle
  return (
    <button
      onClick={onSubmit}
      className="px-4 py-1 rounded-md bg-green-600 hover:bg-sky-600 text-white"
    >
      Submit
    </button>
  );
};

export default ActionButton;
