import type { Auth, User } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { ImageCell, Media } from "@/core";

export type FirebaseContextType = {
  auth: Auth;
  firestore: Firestore;
  user: User | null;
  // favorites: Map<number, ImageCell>;
  setUser: (user: User | null) => void;
  refreshUser: (updates: { displayName?: string; photoURL?: string }) => Promise<void>;
  // toggleFavorite: (image: ImageCell) => Promise<void>;

  // my stuff from a5 idk what to do with it
  userName: string;
  favorites: Map<number, ImageCell>;
  saveGenres: () => Promise<void>;
  setUserName: (userName: string) => void;
  toggleFavorite: (image: ImageCell) => void;
  clearFavorites: (media: Media) => void;
  movieGenres: string[];
  tvGenres: string[];
  toggleMovieGenre: (name: string) => void;
  toggleTvGenre: (name: string) => void;
  cart: Map<number, ImageCell>;
  toggleCart: (image: ImageCell) => void;
  emptyCart: () => void;
  changePassword: (password: string) => Promise<void>;
};
