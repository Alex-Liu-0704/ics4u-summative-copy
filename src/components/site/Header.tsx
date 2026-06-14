import { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, LinkGroup, SearchBar } from "@/components";
import { ICON_SIZE } from "@/core";
import { useFirebaseContext } from "@/hooks";
import { signOut } from "firebase/auth";
import { GoSignOut } from "react-icons/go";

export const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("movie");
  const { cart, favorites, userName, user, auth } = useFirebaseContext();

  return (
    <header className="border-gray-700 border-b bg-gray-900 text-white">
      <nav className="flex flex-wrap items-center gap-4 p-4 px-15">
        <h1 className="font-bold text-2xl text-white-900">TMDB Explorer</h1>
        <LinkGroup
          options={[
            {
              label: "Movies",
              match: "/movies/category/:category",
              to: "/movies/category/now_playing",
            },
            {
              label: "TV",
              match: "/tv/category/:category",
              to: "/tv/category/airing_today",
            },
            {
              label: "Trending",
              match: "/trending/:category",
              to: "/trending/movies?interval=day",
            },
            {
              label: "Genre",
              match: "/genre/:category/:genre",
              to: "/genre/movies/action",
            },
          ]}
        />
        <div className="ml-auto flex items-center gap-3">
          <SearchBar
            onChange={(input) => {
              navigate(`/search?q=${input}&type=${type}`);
              setQuery(input);
            }}
            value={query}
          />
          <ButtonGroup
            onClick={(type) => {
              setType(type);
              query && navigate(`/search?q=${query}&type=${type}`);
            }}
            options={[
              { label: "Movies", value: "movie" },
              { label: "TV", value: "tv" },
              { label: "Person", value: "person" },
            ]}
            value={type}
          />
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="mr-2 flex items-center gap-3 rounded-full border border-gray-700 bg-gray-800 px-3 py-1">
            {user?.photoURL && (
              <img src={user.photoURL} alt="avatar" className="size-8 rounded-full object-cover ring-2 ring-blue-500/30" />
            )}
            <span className="font-semibold text-sm">
              Welcome, <span className="hidden font-medium text-gray-200 text-sm sm:inline">{user?.displayName ?? userName}</span>
            </span>
          </div>
          <div className="flex gap-2">
            <button className="relative rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/favorites")}>
              <FaRegHeart size={ICON_SIZE} />
              {favorites.size > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                  {favorites.size}
                </span>
              )}
            </button>
            <button className="relative rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/cart")}>
              <BsCart2 size={ICON_SIZE} />
              {cart.size > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                  {cart.size}
                </span>
              )}
            </button>
            <button className="rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/settings")}>
              <GoGear size={ICON_SIZE} />
            </button>
            <button className="rounded-full p-2 transition hover:bg-gray-700" onClick={() => signOut(auth)}>
              <GoSignOut size={ICON_SIZE} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
