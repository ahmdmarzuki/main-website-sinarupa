import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import RegisterPage from "./pages/RegisterPage";
import UploadArt from "./pages/UploadArt";

function App() {
  useEffect(() => {
    document.title = "Sinarupa";
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/regist" element={<RegisterPage />} />
        <Route path="/upload" element={<UploadArt />} />
      </Routes>
    </main>
  );
}

export default App;
