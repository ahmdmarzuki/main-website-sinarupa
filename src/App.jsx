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
        <Route path="/" element={<Homepage />} />
        <Route path="/upload" element={<UploadArt />} />
        <Route path="/pending" element={<PendingSubsmissionPage />} />
        <Route path="/karyabebas" element={<ArtDisplay />} />
        <Route
          path="/karyabebas/sr"
          element={<ArtDisplay initialMajor="Seni Rupa" />}
        />
        <Route
          path="/karyabebas/dkvnvd"
          element={<ArtDisplay initialMajor="Desain Komunikasi Visual" />}
        />
        <Route
          path="/karyabebas/dp"
          element={<ArtDisplay initialMajor="Desain Produk" />}
        />
        <Route
          path="/karyabebas/di"
          element={<ArtDisplay initialMajor="Desain Interior" />}
        />
        <Route
          path="/karyabebas/kr"
          element={<ArtDisplay initialMajor="Kriya" />}
        />
      </Routes>
    </main>
  );
}

export default App;
