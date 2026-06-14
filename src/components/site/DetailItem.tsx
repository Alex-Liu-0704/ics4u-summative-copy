type DetailItemProps = {
  label: string;
  value: string | number;
};

export const DetailItem = ({ label, value }: DetailItemProps) => {
  return (
    <div className="rounded-lg bg-gray-800/60 p-3">
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="font-semibold text-sm">{value}</p>
    </div>
  );
};
