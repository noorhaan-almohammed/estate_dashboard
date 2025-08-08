function InfoItem({
  label,
  value,
  isCurrency = false,
  unit = "",
}: {
  label: string;
  value: string | number | undefined;
  isCurrency?: boolean;
  unit?: string;
}) {
  const displayValue =
    value === undefined || value === null || value === ""
      ? "-"
      : isCurrency
      ? `$${value}`
      : unit
      ? `${value} ${unit}`
      : value;

  return (
    <div className="flex justify-between border border-borderColor p-4 rounded-xl shadow-lg hover:border-hoverPurple">
      <span className="font-medium text-mainText text-xl">{label}</span>
      <span className=" text-secPurple text-lg">{displayValue}</span>
    </div>
  );
}

export default InfoItem;
