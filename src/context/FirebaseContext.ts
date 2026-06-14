import { createContext } from "react";
import type { FirebaseContextType } from "@/core/types";

export const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);
