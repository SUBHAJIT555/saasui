import { useContext } from "react";
import { LenisContext } from "@/providers/LenisContext";

export const useLenis = () => {
  const context = useContext(LenisContext);
  return context.lenis;
};
