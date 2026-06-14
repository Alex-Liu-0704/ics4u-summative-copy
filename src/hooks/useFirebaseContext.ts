import { useContext } from "react";
import { FirebaseContext } from "@/context";
import type { FirebaseContextType } from "@/core";

export const useFirebaseContext = (): FirebaseContextType => {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error("useFirebaseContext must be used within a FirebaseProvider");
  }
  return context;
};
