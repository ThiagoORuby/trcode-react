import { FileExplorerContext } from "@/contexts/ExplorerProvider";
import { useContext } from "react";

export const useExplorer = () => {
  const context = useContext(FileExplorerContext);
  if (!context) {
    throw new Error("useExplorer must be used within a FileExplorerProvider");
  }
  return context;
};
