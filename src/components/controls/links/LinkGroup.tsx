import { Link } from "@/components";

type LinkGroupProps = {
  options: Array<{
    label: string;
    to: string;
    match?: string;
  }>;
};

export const LinkGroup = ({ options }: LinkGroupProps) => {
  return (
    <nav className="flex gap-3">
      {options.map((option) => (
        <Link key={option.label} match={option.match} to={option.to}>
          {option.label}
        </Link>
      ))}
    </nav>
  );
};
