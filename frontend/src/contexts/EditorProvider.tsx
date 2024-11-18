import { FileItem } from "@/types/entities";
import React, { createContext, useState } from "react";

interface EditorProviderProps {
  children: React.ReactNode;
}

type EditorProviderState = {
  currentFile: FileItem | null;
  currentData: string;
  changeFile: (file: FileItem) => Promise<void>;
  updateData: (data: string) => void;
};

const initialState: EditorProviderState = {
  currentFile: null,
  currentData: "",
  changeFile: async () => {},
  updateData: () => {},
};

export const EditorContext = createContext<EditorProviderState>(initialState);

export function EditorProvider({ children }: EditorProviderProps) {
  const [currentFile, setCurrentFile] = useState<FileItem | null>(null);
  const [currentData, setCurrentData] = useState<string>(
    'print("Olá, Mundo!")',
  );

  const changeFile = async (file: FileItem) => {
    setCurrentFile(file);
    const f = await (file.handle as FileSystemFileHandle).getFile();
    const content = await f.text();
    setCurrentData(content);
  };

  const updateData = (data: string) => {
    setCurrentData(data);
  };

  return (
    <EditorContext.Provider
      value={{
        currentFile,
        currentData,
        changeFile,
        updateData,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
