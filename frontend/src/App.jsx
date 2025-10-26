// frontend/src/App.jsx
import ProfileWidget from "./components/ProfileWidget";
import GalleryWidget from "./components/GalleryWidget";

function App() {
  return (
    <div className="min-h-screen bg-[#1e2124] text-white flex flex-col md:flex-row items-center md:items-start justify-center md:justify-end px-10 md:px-20 py-16 space-y-10 md:space-y-0 md:space-x-10">
      {/* Left side empty but responsive */}
      <div className="flex-1 hidden md:block" />

      {/* Right side widgets */}
      <div className="flex flex-col space-y-10">
        <ProfileWidget />
        <GalleryWidget />
      </div>
    </div>
  );
}

export default App;
