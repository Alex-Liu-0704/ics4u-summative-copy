import type { ReactNode } from "react";
import { NavLink, useMatch } from "react-router-dom";

type LinkProps = {
  children: ReactNode;
  to: string;
  match?: string;
};

export const Link = ({ children, to, match }: LinkProps) => {
  const matchResult = useMatch({ path: match || "" });
  const isMatched = !!match && !!matchResult;

  return (
    <NavLink
      className={({ isActive }) =>
        `rounded-md border px-4 py-1 transition-all duration-200 ${
          isActive || isMatched
            ? "scale-105 border-white bg-white text-gray-900 shadow-lg"
            : "border-gray-700 bg-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-600 hover:text-white"
        }`
      }
      replace
      to={to}
    >
      {children}
    </NavLink>
  );
};
