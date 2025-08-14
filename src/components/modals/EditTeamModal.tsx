import FormEdit from "../../reusecomponents/FormEdit";


interface TeamMember {
  id: string;
  name: string;
  position: string;
  profileImage: string;
  createdAt?: any;
}

interface EditTeamModalProps {
  onClose: () => void;
  onSuccess: () => void;
  item: TeamMember;
}

const CLOUDINARY_UPLOAD_PRESET = "unsigned_upload";

export default function EditTeamModal({
  onClose,
  onSuccess,
  item: member,
}: EditTeamModalProps) {
  const fields = [
    { name: "name", type: "text", placeholder: "Name", required: true },
    { name: "position", type: "text", placeholder: "Position", required: true }
  ];

  const imageFields = [{
    name: "profileImage",
    uploadPreset: CLOUDINARY_UPLOAD_PRESET,
    folder: "team",
    multiple: false
  }];

  return (
    <FormEdit
      collectionName="team"
      item={member}
      fields={fields}
      imageFields={imageFields}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}