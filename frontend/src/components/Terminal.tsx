import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Play } from "lucide-react";
import { useEditor } from "@/hooks/useEditor";
import axios from "axios";

interface TerminalProps {
  initialOutput: string;
}

// Componente Terminal
const Terminal: React.FC<TerminalProps> = ({ initialOutput }) => {
  const [output, setOutput] = useState<string>(initialOutput);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentData } = useEditor();

  const runCode = async () => {
    setIsLoading(true);
    setOutput("");
    try {
      const response = await axios.post("http://localhost:5000/run", {
        code: currentData,
      });
      console.log(response.data.output);
      setOutput(response.data.output);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setOutput(`Error: ${error.response.data.output}`);
        } else {
          setOutput(`Error: ${error.message}`);
        }
      } else {
        setOutput(`Unexpected Error: ${error}`);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="terminal p-4 bg-black text-white font-mono border rounded">
      <div className="flex pb-2 justify-between">
        <h4 className="font-mono border-b">TERMINAL</h4>
        <Button variant="outline" onClick={runCode} disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : <Play />} Run
        </Button>
      </div>
      <div className="h-48 overflow-y-auto w-full overflow-x-auto">
        <pre className="text-wrap"> &gt; {output}</pre>
      </div>
    </div>
  );
};

export default Terminal;
