import "./App.css";

import { useRef, useState } from "react";
import { type Id, toast, ToastContainer } from "react-toastify";

function App() {
  const [command, setCommand] = useState<string>("");
  const toastId = useRef<Id | null>(null);

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const prompt = e.target.value;
    const cmd = prompt
      .split("\n")
      .map((line) => line.replace(/^\s*(\$|#)\s*/, ""))
      .join("\n");
    setCommand(cmd);
    await navigator.clipboard.writeText(cmd);
    if (toastId.current === null) {
      toastId.current = toast("Command copied to clipboard!", {
        type: "success",
      });
    } else {
      toast.update(toastId.current);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-base-200">
      <div className="navbar bg-base-100 shadow-sm">
        <h1>
          <a className="btn btn-ghost text-xl">Dollar Remover</a>
        </h1>
        <div className="ml-4 text-sm mt-1.5 opacity-70">
          Clean terminal commands copied from documentation, blogs, and
          tutorials.
        </div>
      </div>
      <div className="container grow my-20 rounded-2xl bg-base-100 flex flex-col gap-10 p-10">
        <div className="flex flex-col grow gap-2">
          <div className="font-bold text-3xl">Input</div>
          <textarea
            className="textarea grow w-full"
            placeholder="Paste Shell Prompts..."
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col grow gap-2">
          <div className="font-bold text-3xl">Output</div>
          <textarea
            className="textarea grow w-full"
            placeholder="Commands will appear here..."
            value={command}
            readOnly
          />
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default App;
