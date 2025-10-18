export default function App() {
  return (
    <>
      <button
        onClick={() => {
          console.log("Connecting to MongoDB");
        }}
        className="bg-blue-500 text-white p-2 rounded-md active:bg-blue-600"
      >
        Connect to MongoDB
      </button>
    </>
  );
}
