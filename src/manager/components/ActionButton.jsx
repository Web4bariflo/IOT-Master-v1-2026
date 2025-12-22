const ActionButton = ({ isSubmitting, onSubmit, onAbort }) => {
  return (
    <button
      onClick={isSubmitting ? onAbort : onSubmit}
      className={`px-4 py-1 rounded-md font-medium transition
        ${
          isSubmitting
            ? "bg-slate-500 hover:bg-red-600 text-white"
            : "bg-green-600 hover:bg-sky-600 text-white"
        }`}
    >
      {isSubmitting ? "Abort" : "Submit"}
    </button>
  );
};

export default ActionButton;
