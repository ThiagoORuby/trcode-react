import { useExplorer } from "@/hooks/useExplorer";
import { DirectoryEntry } from "./DirectoryEntry";
import { Button } from "./ui/button";

export function FileExplorer() {
  const { fileStructure, openDirectory } = useExplorer();

  const openProject = async () => {
    if ("showDirectoryPicker" in window) {
      const handle = await (window as any).showDirectoryPicker();
      await openDirectory(handle);
    } else {
      alert("File System Access API não é suportada neste navegador.");
    }
  };

  return fileStructure ? (
    <div className="flex flex-col justify-center space-y-4 p-6 mx-auto">
      <Button onClick={openProject} variant="outline" size="sm">
        Mudar Projeto
      </Button>
      <DirectoryEntry directory={fileStructure} toggle={true} />
    </div>
  ) : (
    <div className="flex flex-col space-y-4 p-10 mx-auto">
      <Button onClick={openProject} variant="outline">
        Abrir Projeto
      </Button>
      <p className="text-center">Nenhum projeto aberto no momento</p>
    </div>
  );
}
