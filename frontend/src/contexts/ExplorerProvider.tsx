import { FileItem } from "@/types/entities";
import React, { createContext, useState } from "react";

interface FileExplorerProps {
  children: React.ReactNode;
}

type FileExplorerState = {
  fileStructure: FileItem | null;
  activeFile?: string;
  openFile: (path: string) => void;
  openDirectory: (handle: FileSystemDirectoryHandle) => Promise<void>;
};

const initialState: FileExplorerState = {
  fileStructure: null,
  activeFile: undefined,
  openFile: () => null,
  openDirectory: async () => {},
};

export const FileExplorerContext =
  createContext<FileExplorerState>(initialState);

export function FileExplorerProvider({ children }: FileExplorerProps) {
  const [fileStructure, setFileStructure] = useState<FileItem | null>(null);
  const [activeFile, setActiveFile] = useState<string | undefined>(undefined);

  const openFile = (path: string) => {
    setActiveFile(path);
    console.log("Abrindo o arquivo: ", path);
  };

  const openDirectory = async (handle: FileSystemDirectoryHandle) => {
    const item: FileItem = {
      name: handle.name,
      path: handle.name,
      handle: handle,
      type: handle.kind,
      children: [],
    };
    console.log("chameei");
    for await (const [name, entry] of handle.entries()) {
      item.children.push({
        name: name,
        path: `${item.name}/${name}`,
        handle: entry,
        type: entry.kind,
        children: [],
      });
    }
    setFileStructure(item);
    console.log(fileStructure);
  };

  return (
    <FileExplorerContext.Provider
      value={{
        fileStructure,
        activeFile,
        openFile,
        openDirectory,
      }}
    >
      {children}
    </FileExplorerContext.Provider>
  );
}
