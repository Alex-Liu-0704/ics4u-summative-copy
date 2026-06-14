import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, type User, updatePassword, updateProfile } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { FirebaseContext } from "@/context";
import {
  CART_KEY,
  FAVORITES_KEY,
  type ImageCell,
  MOVIE_GENRES,
  MOVIE_GENRES_KEY,
  type Media,
  TV_GENRES,
  TV_GENRES_KEY,
  USERNAME_KEY,
  type UserDocument,
} from "@/core";
import { useLocalStorage } from "@/hooks";

const firebaseConfig = {
  apiKey: "AIzaSyCwH45YTdf8WfwIy71snmt4jhdJuaCnjX0",
  appId: "1:884203603550:web:8ad3eb05926fdba12616cf",
  authDomain: "ics4u-summative-2a605.firebaseapp.com",
  messagingSenderId: "884203603550",
  projectId: "ics4u-summative-2a605",
  storageBucket: "ics4u-summative-2a605.firebasestorage.app",
};

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  // const [favorites, setFavorites] = useState<Map<number, ImageCell>>(new Map());

  const { auth, firestore } = useMemo(() => {
    const app = initializeApp(firebaseConfig);

    return { auth: getAuth(app), firestore: getFirestore(app) };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const snapshot = await getDoc(doc(firestore, "users", user.uid));
          // const favoritesData: UserDocument = snapshot.exists() ? snapshot.data().favorites : {};
          setUser(user);
          // setFavorites(new Map(Object.entries(favoritesData).map(([k, v]) => [Number(k), v as unknown as ImageCell])));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("User sync error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, firestore]);

  const refreshUser = async (updates: { displayName?: string; photoURL?: string }) => {
    if (!auth.currentUser) {
      return;
    }

    try {
      await updateProfile(auth.currentUser, updates);
      await auth.currentUser.reload();
      setUser(Object.assign(Object.create(Object.getPrototypeOf(auth.currentUser)), auth.currentUser));
    } catch (error) {
      console.error("Refresh error:", error);
    }
  };

  // const toggleFavorite = async (image: ImageCell) => {
  //   const next = new Map(favorites);
  //   next.has(image.id) ? next.delete(image.id) : next.set(image.id, image);

  //   setFavorites(next);

  //   if (user) {
  //     await setDoc(doc(firestore, "users", user.uid), { favorites: Object.fromEntries(next) });
  //   }
  // };

  // a5 stuff idk i throw it here okay
  const [userName, setUserName] = useLocalStorage<string, string>(USERNAME_KEY, "User");
  const [favorites, setFavorites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVORITES_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });

  const [movieGenres, setMovieGenres] = useLocalStorage<string[]>(
    MOVIE_GENRES_KEY,
    MOVIE_GENRES.map((g) => g.name),
  );

  const [tvGenres, setTvGenres] = useLocalStorage<string[]>(
    TV_GENRES_KEY,
    TV_GENRES.map((g) => g.name),
  );

  const toggleMovieGenre = (name: string) => {
    setMovieGenres((prev) => (prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]));
  };

  const toggleTvGenre = (name: string) => {
    setTvGenres((prev) => (prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]));
  };

  const toggleFavorite = (image: ImageCell) => {
    setFavorites((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);
        setCart((prev) => {
          const clonedCart = new Map(prev);
          clonedCart.delete(image.id);
          return clonedCart;
        });
      }

      return cloned;
    });
  };

  const clearFavorites = (media: Media) => {
    setFavorites((prev) => {
      const entries = Array.from(prev.entries()).filter((item) => item[1].media !== media);
      return new Map(entries);
    });
  };

  const [cart, setCart] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(CART_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });

  const toggleCart = (image: ImageCell) => {
    setCart((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);
        setFavorites((prev) => {
          const clonedFav = new Map(prev);
          clonedFav.delete(image.id);
          return clonedFav;
        });
      }

      return cloned;
    });
  };

  const emptyCart = () => setCart(new Map());

  const saveGenres = async () => {
    if (user) {
      await setDoc(doc(firestore, "users", user.uid), { movieGenres, tvGenres }, { merge: true });
    }
  };

  const changePassword = async (password: string) => {
    if (!auth.currentUser) {
      return;
    } else {
      await updatePassword(auth.currentUser, password);
    }
  };

  // this line is from the original starter code
  if (loading) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        cart,
        changePassword,
        clearFavorites,
        emptyCart,
        // favorites,
        firestore,
        favorites,
        movieGenres,
        refreshUser,
        saveGenres,
        setUser,
        setUserName,
        toggleCart,
        // toggleFavorite,
        toggleFavorite,
        toggleMovieGenre,
        toggleTvGenre,
        tvGenres,
        user,
        userName,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
