import { FileItem } from "@/types/entities";
import { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { FileEntry } from "./FileEntry";
// import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface directoryEntryProps {
  directory: FileItem;
  toggle: boolean;
}

export function DirectoryEntry({ directory, toggle }: directoryEntryProps) {
  const [isOpen, setIsOpen] = useState<boolean>(toggle);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /*
  const createFileInDir = async (
    handle: FileSystemDirectoryHandle,
    filename: string,
    content: string,
  ) => {
    try {
      const fileHandle = await handle.getFileHandle(filename, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();
      toast.success(`Arquivo ${filename} criado em ${handle.name}/`);
    } catch (e) {
      toast.success(`Erro ao criar o arquivo ${filename}`);
    }
  };
  */

  useEffect(() => {
    if (isOpen && directory.children.length == 0) {
      setIsLoading(true);
      const getData = async () => {
        const handle = directory.handle as FileSystemDirectoryHandle;
        for await (const [name, entry] of handle.entries()) {
          directory.children.push({
            name: name,
            path: `${directory.name}/${name}`,
            handle: entry,
            type: entry.kind,
            children: [],
          });
        }
        setIsLoading(false);
      };
      getData();
    }
  }, [isOpen, directory]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4>{directory.name}</h4>
        <div className="px-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Novo Arquivo</DialogTitle>
                <DialogDescription>Criar novo arquivo</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent>
        <div className="space-y-4 p-4">
          {isLoading ? (
            <div></div>
          ) : directory.children.length > 0 ? (
            directory.children.map((item, index) =>
              item.type == "file" ? (
                <FileEntry item={item} key={index} />
              ) : (
                <DirectoryEntry directory={item} key={index} toggle={false} />
              ),
            )
          ) : (
            <div></div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
