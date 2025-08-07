import { useState } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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
    achievement: Achievement;
}

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dxwb3czjn/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "unsigned_upload";

export default function EditAchievementModal({
    onClose,
    onSuccess,
    achievement,
}: EditAchievementModalProps) {
    const [formData, setFormData] = useState({
        title: achievement.title || "",
        year: achievement.year || "",
        description: achievement.description || "",
    });
    const [imageUrls, setImageUrls] = useState<string[]>(achievement.imageUrls || []);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [features, setFeatures] = useState<string[]>(achievement.features || []);

    const handleFeatureChange = (index: number, value: string) => {
        const updated = [...features];
        updated[index] = value;
        setFeatures(updated);
    };

    const addFeatureField = () => {
        setFeatures([...features, ""]);
    };

    const removeFeatureField = (index: number) => {
        const updated = [...features];
        updated.splice(index, 1);
        setFeatures(updated);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const uploadToCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        formData.append("folder", "achievements");

        const res = await fetch(CLOUDINARY_UPLOAD_URL, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (res.ok && data.secure_url) {
            return data.secure_url;
        } else {
            throw new Error(data.error?.message || "Upload failed");
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setUploading(true);
        const urls: string[] = [];

        try {
            for (const file of Array.from(files)) {
                const url = await uploadToCloudinary(file);
                urls.push(url);
            }
            setImageUrls(prev => [...prev, ...urls]);
        } catch (err) {
            console.error("Image upload error:", err);
            alert("Image upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (urlToRemove: string) => {
        setImageUrls((prev) => prev.filter((url) => url !== urlToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const achievementRef = doc(db, "achievements", achievement.id);
            await updateDoc(achievementRef, {
                ...formData,
                features: features.filter(f => f.trim() !== ""),
                imageUrls,
                updatedAt: serverTimestamp(),
            });

            onSuccess();
            onClose();
        } catch (err) {
            console.error("Error updating achievement:", err);
            alert("Failed to update achievement.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 w-screen bg-[#3333334e] bg-opacity-10 flex flex-col justify-center items-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white overflow-y-auto space-y-4 p-8 rounded-xl w-[90%] shadow-lg"
            >        <h2 className="text-2xl text-seconderyStar font-bold mb-4">Edit Achievement</h2>

                <div className="flex justify-between gap-8">
                    <div className="flex flex-col w-1/2 gap-2">
                        <h3 className="text-xl text-seconderyStar font-bold">Basic info</h3>
                        <div className="flex items-center justify-between gap-2">
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Title"
                                className="border-2 border-gray-400 text-seconderyStar placeholder:text-gray-400 placeholder:text-sm p-2 rounded w-full"
                            />
                            <input
                                className="border-2 text-transparent p-1 rounded bg-mainPurple hover:bg-hoverPurple aspect-square w-11 h-11 cursor-pointer"
                                type="file"
                                accept=".png, .jpg, .jpeg, .webp"
                                multiple
                                onChange={handleImageUpload}
                            />
                        </div>
                    </div>
                </div>

                <h3 className="text-xl text-seconderyStar font-bold">Description & Features</h3>
                <div className="flex justify-between gap-2">
                    <div className="flex flex-col w-1/2 gap-2">
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Achievement description"
                            className="border-2 border-gray-400 text-seconderyStar placeholder:text-gray-400 placeholder:text-sm p-2 rounded"
                            required
                        />
                    </div>
                    <div className="flex w-1/2 gap-2">
                        <div className="flex flex-col w-full gap-2">
                            {features.map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder={`Feature ${index + 1}`}
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        className="w-full border-2 border-gray-400 text-seconderyStar placeholder:text-gray-400 placeholder:text-sm p-2 rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFeatureField(index)}
                                        className="bg-red-500 text-white font-bold px-3 rounded hover:bg-red-600"
                                        title="Remove Feature"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addFeatureField}
                            className="bg-mainPurple text-xl font-bold aspect-square w-11 h-11 flex items-center justify-center text-white p-1 rounded cursor-pointer hover:bg-hoverPurple"
                        >
                            +
                        </button>
                    </div>
                </div>

                <h3 className="text-xl text-seconderyStar font-bold">Update Images</h3>
                <div className="flex items-center gap-2">
                    <div className="relative w-fit flex items-center justify-center">
                        <input
                            className="border-2 text-transparent p-1 rounded bg-mainPurple hover:bg-hoverPurple aspect-square w-11 h-11 cursor-pointer"
                            type="file"
                            accept=".png, .jpg, .jpeg, .webp"
                            multiple
                        />
                        <label className="absolute text-xl font-bold flex items-center justify-center text-white">
                            +
                        </label>
                    </div>
                    {uploading && <p className="text-seconderyStar">Uploading images...</p>}

                    <div className="flex flex-wrap gap-2 mt-2">
                        {imageUrls.map((url, idx) => (
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
                    </div>
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
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Achievement"}
                    </button>
                </div>
            </form>
        </div>
    );
}