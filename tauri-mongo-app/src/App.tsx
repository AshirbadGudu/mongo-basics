import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
type Database = {
  name: string;
  sizeOnDisk: number;
  empty: boolean;
};
export default function App() {
  const [result, setResult] = useState<string | null>(null);
  const [databases, setDatabases] = useState<Database[] | null>(null);
  return (
    <main className="flex gap-4 items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center w-80">
        <h2 className="text-xl font-semibold mb-4">MongoDB Connection</h2>
        <button
          onClick={async () => {
            const result = await invoke("connect_mongodb");
            setResult(result as string);
          }}
          className="bg-blue-500 text-white p-2 rounded-md active:bg-blue-600 w-full"
        >
          Connect to MongoDB
        </button>
        {result && <p className="mt-4 text-green-400 text-center">{result}</p>}
      </div>
      {/* List databases */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center w-80">
        <h2 className="text-xl font-semibold mb-4">List Databases</h2>
        <button
          onClick={async () => {
            const result = (await invoke("list_databases")) as Database[];
            setDatabases(result);
          }}
          className="bg-blue-500 text-white p-2 rounded-md active:bg-blue-600 w-full"
        >
          List Databases
        </button>
        {databases && (
          <div className="mt-4 text-green-400 text-center">
            {databases.map((database) => (
              <p key={database.name}>{database.name}</p>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
