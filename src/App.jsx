import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import UploadArt from "./pages/UploadArt";
import LoginPage from "./pages/LoginPage";
import PendingSubsmissionPage from "./pages/PendingSubsmissionPage";
import GuestViewPendingPage from "./pages/GuestViewPendingPage";
import ArtDisplay from "./pages/ArtDisplay";

function App() {
  useEffect(() => {
    document.title = "Sinarupa";
  }, []);

  return (
    <main>
      <Routes>
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="/" element={<UploadArt />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pending" element={<PendingSubsmissionPage />} />
        <Route path="/guest" element={<GuestViewPendingPage />} />
        <Route path="/art" element={<ArtDisplay />} />
      </Routes>
    </main>
  );
}

export default App;
