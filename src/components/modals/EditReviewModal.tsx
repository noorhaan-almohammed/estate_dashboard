import InputField from "../InputField";

interface ReviewAddForm {
  type: "text" | "number" | "email";
  name: string;
  holder: string;
  min?: number;
  max?: number;
}

interface AddEditReviewModalProps {
  onClose: () => void;
}

const reviewAddForm: ReviewAddForm[] = [
  {
    type: "text",
    name: "review_name",
    holder: "Full Name",
  },
  {
    type: "text",
    name: "review_country",
    holder: "Add Country",
  },
  {
    type: "text",
    name: "review_city",
    holder: "Add City",
  },
  {
    type: "text",
    name: "review_title",
    holder: "Add Title",
  },
];

const EditReviewModal = ({
  onClose,
}: AddEditReviewModalProps) => {
  const ratingStars: number[] = [1, 2, 3, 4, 5];
  const handleInputChange = () => {
    console.log("hahahaha");
  };
  return (
    <div className="fixed inset-0 w-screen bg-[#333333]/80 bg-opacity-10 flex flex-col justify-center items-center z-50">
      <form className="bg-white overflow-y-auto space-y-4 p-8 rounded-xl w-[90%] lg:w-[75%] shadow-lg">
        <h2 className="text-2xl text-seconderyStar font-bold mb-4">
          Edit Review
        </h2>
        <h3 className="text-xl text-seconderyStar font-bold">Review info</h3>
        <div className="flex items-center gap-5">
          <label htmlFor="rating" className="text-lg font-semibold">
            Rating:
          </label>
          <select
            name="rating"
            id="rating"
            className="border-2 border-gray-400 text-seconderyStar placeholder:text-gray-400 placeholder:text-sm p-2 rounded"
          >
            {ratingStars.map((rate, index) => (
              <option key={index} value={rate}>
                {rate}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          {reviewAddForm.map((item) => (
            <InputField
              key={item.name}
              name={item.name}
              type={item.type}
              placeholder={item.holder}
              onChange={handleInputChange}
            />
          ))}
        </div>

        <div className="w-full">
          <textarea
            className="w-full border-2 border-gray-400 text-seconderyStar placeholder:text-gray-400 placeholder:text-sm p-2 rounded"
            name="review_description"
            id="review_description"
            placeholder="Add description"
            minLength={50}
            maxLength={300}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-fit flex items-center justify-center">
            <input
              className="border-2 text-transparent p-1 rounded bg-mainPurple hover:bg-hoverPurple aspect-square w-11 h-11 cursor-pointer"
              type="file"
              accept=".png, .jpg, .jpeg, .webp"
              multiple
              //   onChange={handleImageUpload}
            />
            <label className="absolute text-xl font-bold flex items-center justify-center text-white">
              +
            </label>
          </div>
          {/* {uploading && <p className="text-seconderyStar">Uploading images...</p>} */}

          {/* <div className="flex gap-2 flex-wrap mt-2">
            {imageUrls.map((url, i) => (
              <div key={idx} className="relative w-24 h-24">
                <img
                  src={url}
                  alt={`image-${idx}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
             ))}
          </div> */}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-mainPurple hover:bg-hoverPurple cursor-pointer text-white px-4 py-2 rounded"
          >
            Update Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReviewModal;
