const AddFaqModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="p-6 rounded-2xl w-[90%] max-w-md bg-white border border-gray-300 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Add New FAQ</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter question"
            className="border border-gray-300 px-4 py-2 rounded-md bg-white text-gray-900 placeholder-gray-500"
          />
          <textarea
            placeholder="Enter answer"
            className="border border-gray-300 px-4 py-2 rounded-md bg-white text-gray-900 h-28 placeholder-gray-500"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-mainPurple text-white px-4 py-2 rounded cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFaqModal;
