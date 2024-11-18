import { FileExplorer } from "./components/FileExplorer";
import { FileExplorerProvider } from "./contexts/ExplorerProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import "./index.css";
import { CodeEditor } from "./components/CodeEditor";
import { ScrollArea } from "./components/ui/scroll-area";
import { EditorProvider } from "./contexts/EditorProvider";
import Terminal from "./components/Terminal";
import { Toaster } from "sonner";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <EditorProvider>
        <FileExplorerProvider>
          <div className="flex h-screen">
            <ScrollArea className="w-1/4 max-w-sm border-r mx-auto">
              <FileExplorer />
            </ScrollArea>
            <div className="flex-1 flex-col p-4 my-auto">
              <CodeEditor />
              <Terminal initialOutput="" />
            </div>
          </div>
          <Toaster richColors theme="dark" />
        </FileExplorerProvider>
      </EditorProvider>
    </ThemeProvider>
  );
}
