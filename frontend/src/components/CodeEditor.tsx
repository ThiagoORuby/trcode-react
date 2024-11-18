import CodeMirror, { keymap } from "@uiw/react-codemirror";
import { oneDark } from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { EditorView } from "@uiw/react-codemirror";
import { useEditor } from "@/hooks/useEditor";
import { toast } from "sonner";

export function CodeEditor() {
  const { currentData, currentFile, updateData } = useEditor();
  const saveFile = async () => {
    if (currentFile) {
      try {
        const file = currentFile.handle as FileSystemFileHandle;
        const writable = await file.createWritable();
        await writable.write(currentData);
        await writable.close();
        toast.success(`Arquivo ${currentFile.name} salvo com sucesso!`);
      } catch (e) {
        toast.error(`Erro ao salvar o arquivo ${currentFile.name} :(`);
      }
    }
  };

  const customStyles = EditorView.theme({
    "&": {
      fontSize: "16px",
    },
  });

  return (
    <CodeMirror
      value={currentData}
      height="60vh"
      theme={oneDark}
      onChange={updateData}
      extensions={[
        python(),
        customStyles,
        keymap.of([
          {
            key: "Ctrl-s",
            run: () => {
              console.log("salvando");
              saveFile();
              return true;
            },
          },
        ]),
      ]}
    />
  );
}
