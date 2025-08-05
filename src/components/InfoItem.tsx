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
    <div className="flex justify-between border-b pb-1">
      <span className="font-medium text-gray-800">{label}</span>
      <span>{displayValue}</span>
    </div>
  );
}

export default InfoItem;
