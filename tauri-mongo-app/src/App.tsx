import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

export default function App() {
  const [result, setResult] = useState<string | null>(null);
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <button
        onClick={async () => {
          const result = await invoke("connect_mongodb");
          setResult(result as string);
        }}
        className="bg-blue-500 text-white p-2 rounded-md active:bg-blue-600"
      >
        Connect to MongoDB
      </button>
      {result && <p>{result}</p>}
    </main>
  );
}
