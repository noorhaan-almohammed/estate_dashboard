
import FormEdit from "../../reusecomponents/FormEdit";


export interface Achievement {
    id: string;
    title: string;
    year: number;
    description: string;
    features: string[];
    imageUrls: string[];
    createdAt: any;
    updatedAt?: any;
}

interface EditAchievementModalProps {
    onClose: () => void;
    onSuccess: () => void;
    item: Achievement;
}

const CLOUDINARY_UPLOAD_PRESET = "unsigned_upload";

export default function EditAchievementModal({
    onClose,
    onSuccess,
    item: achievement,
}: EditAchievementModalProps) {
    const fields = [
        {
            name: "title",
            type: "text",
            placeholder: "Title",
            required: true
        },
        {
            name: "year",
            type: "number",
            placeholder: "Year",
            required: true
        },
        {
            name: "description",
            type: "textarea",
            placeholder: "Description",
            required: true,
            rows: 5
        }
    ];

    const imageFields = [
        {
            name: "imageUrls",
            uploadPreset: CLOUDINARY_UPLOAD_PRESET,
            folder: "achievements",
            multiple: true
        }
    ];

    const arrayFields = [
        {
            name: "features",
            placeholder: "Feature"
        }
    ];

    return (
        <FormEdit
            collectionName="achievements"
            item={achievement}
            fields={fields}
            imageFields={imageFields}
            arrayFields={arrayFields}
            onClose={onClose}
            onSuccess={onSuccess}
        />
    );
}