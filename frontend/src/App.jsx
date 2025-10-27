// frontend/src/App.jsx
import ProfileWidget from "./components/ProfileWidget";
import GalleryWidget from "./components/GalleryWidget";

function App() {
  return (
    <div className="min-h-screen bg-[#1e2124] text-white flex flex-col items-center justify-center px-10 py-16 space-y-10">
      {/* Vertically stacked widgets */}
      <ProfileWidget />
      <GalleryWidget />
    </div>
  );
}

export default App;
