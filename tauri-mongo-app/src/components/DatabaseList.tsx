import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

type Database = {
  name: string;
  sizeOnDisk: number;
  empty: boolean;
};

export default function DatabaseList() {
  const [databases, setDatabases] = useState<Database[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleListDatabases = async () => {
    setIsLoading(true);
    try {
      const result = (await invoke("list_databases")) as Database[];
      setDatabases(result);
    } catch (error) {
      console.error("Error listing databases:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 p-6 w-full max-w-4xl mx-auto">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Database List</h2>
            <p className="text-sm text-gray-400">View and manage databases</p>
          </div>
        </div>

        <button
          onClick={handleListDatabases}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              List Databases
            </>
          )}
        </button>
      </div>

      {/* Database Table */}
      {databases && (
        <div className="bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600/50">
          {/* Table Header */}
          <div className="bg-gray-600/50 px-4 py-3 border-b border-gray-600/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-200">
                  Found {databases.length} database
                  {databases.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                Total Size:{" "}
                {formatBytes(
                  databases.reduce((sum, db) => sum + db.sizeOnDisk, 0)
                )}
              </div>
            </div>
          </div>

          {/* Database List */}
          <div className="max-h-80 overflow-y-auto">
            {databases.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <svg
                  className="w-12 h-12 mx-auto mb-3 opacity-50"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                <p className="text-sm">No databases found</p>
              </div>
            ) : (
              databases.map((database, index) => (
                <div
                  key={database.name}
                  className={`px-4 py-3 border-b border-gray-600/30 last:border-b-0 hover:bg-gray-700/30 transition-colors ${
                    index % 2 === 0 ? "bg-gray-800/20" : "bg-gray-800/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">
                          {database.name}
                        </span>
                        {database.empty && (
                          <span className="px-2 py-1 bg-yellow-900/50 text-yellow-300 text-xs rounded-full">
                            Empty
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 font-mono">
                      {formatBytes(database.sizeOnDisk)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
