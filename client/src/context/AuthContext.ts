import { createContext } from "react";

type AuthContextType = object

export const AuthContext = createContext<AuthContextType | any>(null);