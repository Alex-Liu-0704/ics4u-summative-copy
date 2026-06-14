type AvatarSelectorProps = {
  avatars: string[];
  value: string;
  onChange: (url: string) => void;
};

export const AvatarSelector = ({ avatars, value, onChange }: AvatarSelectorProps) => {
  return (
    <div className="flex justify-between gap-2 px-5">
      {avatars.map((url) => (
        <img
          className={`size-12 cursor-pointer rounded-full border ${value === url ? "border-blue-500" : "border-transparent"}`}
          key={url}
          onClick={() => onChange(url)}
          src={url}
        />
      ))}
    </div>
  );
};
