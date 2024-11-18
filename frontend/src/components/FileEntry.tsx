import { FileItem } from "@/types/entities";
import { Button } from "./ui/button";
import { FileCode2 } from "lucide-react";
import { useEditor } from "@/hooks/useEditor";

interface FileEntryProps {
  item: FileItem;
}

export function FileEntry({ item }: FileEntryProps) {
  const { changeFile, currentFile } = useEditor();

  const openFile = async () => {
    if (currentFile && currentFile.path == item.path) {
      return;
    }
    await changeFile(item);
    console.log(`Abrindo o arquivo: ${item.name}`);
  };

  return (
    <div className="flex flex-col justify-start space-y-2 mx-auto">
      <Button
        variant={
          currentFile && currentFile.path == item.path ? "secondary" : "ghost"
        }
        className="justify-start"
        onClick={openFile}
      >
        <FileCode2 />
        {item.name}
      </Button>
    </div>
  );
}
