import "./App.css";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [command, setCommand] = useState<string>("");
  return (
    <div className="w-screen h-screen flex justify-center bg-base-200">
      <div className="container my-20 rounded-2xl bg-base-100 flex flex-col gap-10 p-10">
        <div className="flex flex-col grow gap-2">
          <div className="font-bold text-3xl">Input</div>
          <textarea
            className="textarea grow w-full"
            placeholder="Paste Shell Prompts..."
            onChange={async (e) => {
              const prompt = e.target.value;
              const cmd = prompt
                .split("\n")
                .map((line) =>
                  line
                    .trim()
                    .replace(/^(\$|#)/, "")
                    .trim(),
                )
                .join("\n");
              setCommand(cmd);
              await navigator.clipboard.writeText(cmd);
              toast("Command copied to clipboard!", { type: "success" });
            }}
          />
        </div>
        <div className="flex flex-col grow gap-2">
          <div className="font-bold text-3xl">Output</div>
          <textarea
            className="textarea grow w-full"
            placeholder="Commands will appear here..."
            value={command}
          />
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default App;
