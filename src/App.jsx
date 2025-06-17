import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import UploadArt from "./pages/UploadArt";
import LoginPage from "./pages/LoginPage";
import PendingSubsmissionPage from "./pages/PendingSubsmissionPage";
import GuestViewPendingPage from "./pages/GuestViewPendingPage";

function App() {
  useEffect(() => {
    document.title = "Sinarupa";
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="upload" element={<UploadArt />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pending" element={<PendingSubsmissionPage />} />
        <Route path="/guest" element={<GuestViewPendingPage />} />
      </Routes>
    </main>
  );
}

export default App;
