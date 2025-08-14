import FormEdit from "../../reusecomponents/FormEdit";

interface Review {
  id: string;
  name: string;
  country: string;
  city: string;
  title: string;
  description: string;
  rating: number;
  profileimage: string;
  createdAt: any;
}

interface EditReviewModalProps {
  onClose: () => void;
  onSuccess: () => void;
  item: Review;
}

const CLOUDINARY_UPLOAD_PRESET = "unsigned_upload";

export default function EditReviewModal({
  onClose,
  onSuccess,
  item: review,
}: EditReviewModalProps) {
  const fields = [
    { name: "name", type: "text", placeholder: "Name", required: true },
    { name: "country", type: "text", placeholder: "Country", required: true },
    { name: "city", type: "text", placeholder: "City", required: true },
    { name: "title", type: "text", placeholder: "Title", required: true },
    { 
      name: "rating", 
      type: "select", 
      placeholder: "Rating", 
      required: true,
      options: [1, 2, 3, 4, 5].map(num => ({
        value: num,
        label: `${num} Star${num !== 1 ? 's' : ''}`
      }))
    },
    { 
      name: "description", 
      type: "textarea", 
      placeholder: "Description", 
      rows: 4,
      required: true 
    }
  ];

  const imageFields = [{
    name: "profileimage",
    uploadPreset: CLOUDINARY_UPLOAD_PRESET,
    folder: "reviews",
    multiple: false
  }];



  return (
    <FormEdit
      collectionName="reviews"
      item={review}
      fields={fields}
      imageFields={imageFields}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}