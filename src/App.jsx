import { useState } from "react";
import {
  Route,
  Routes,
  useNavigate,
  BrowserRouter as Router,
} from "react-router-dom";

import UploadArt from "./pages/UploadArt";
import LoginPage from "./pages/LoginPage";
import PendingSubsmissionPage from "./pages/PendingSubsmissionPage";
import GuestViewPendingPage from "./pages/GuestViewPendingPage";

import ChatPage from "./pages/ChatPage";

import LandingPage from "./pages/LandingPage";
import FormPage from "./pages/FormPage";
import QRPage from "./pages/QRPage";
import Workshop from "./pages/Workshop";
import QRWorkshop from "./pages/QRWorkshop";
import Talkshow from "./pages/Talkshow";
import QRTalkshow from "./pages/QRTalkshow";
import KeongRacun from "./pages/KeongRacun";

import Homepage from "./pages/Homepage";
import SR from "./pages/SR";
import DI from "./pages/DI";

export const FORM_PAMERAN_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdHASWTjIx4uBC72LEmKhQkLtjTOizDBNTkohWjycpLLsYILQ/formResponse";
export const FORM_PAMERAN_VIEWFORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdHASWTjIx4uBC72LEmKhQkLtjTOizDBNTkohWjycpLLsYILQ/viewform";

export const FORM_WORKSHOP_URL_MAIN =
  "https://docs.google.com/forms/d/e/1FAIpQLSfhoun5t8URMoUVQfICcXqmbGdSFNDRSyWElvgzCEQYiEEOpQ/formResponse";
export const FORM_WORKSHOP_VIEWFORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf8nBUwRI8LH_B3uyFZFQLpgHKmLcf55_G0Akn_p-CRO231Fg/viewform";

export const FORM_TALKSHOW_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeOXreyl2wlh-qevLfQ2v4yjtVbrT7KrOM_8-mG188QuCZwVw/formResponse";

export const TALKSHOW_VIEWFORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeOXreyl2wlh-qevLfQ2v4yjtVbrT7KrOM_8-mG188QuCZwVw/viewform";

export const FORM_KEONG_RACUN_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeLN4GtPBYj-SHbTrMEYpxNrHVH9SXmcdO_F61PzXhli8sCgw/formResponse";

export const KEONG_RACUN_VIEWFORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeLN4GtPBYj-SHbTrMEYpxNrHVH9SXmcdO_F61PzXhli8sCgw/viewform";

export default function App() {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (type) => {
    if (type === "pameran") navigate("/form");
    else if (type === "workshop") navigate("/workshop");
    else if (type === "talkshow") navigate("/talkshow");
    else if (type === "keongracun") navigate("/keongracun");
  };

  const handleFormSubmit = (data) => {
    const formDataObj = new URLSearchParams();
    formDataObj.append("entry.2020855966", data.nama);
    formDataObj.append("entry.674447172", data.peran);
    formDataObj.append("entry.285019265", data.instansi);
    formDataObj.append("entry.636715885", data.jumlah);
    formDataObj.append("entry.697553052", data.hari.join(","));

    fetch(FORM_PAMERAN_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formDataObj.toString(),
    });

    setFormData(data);
    localStorage.setItem("formData", JSON.stringify(data)); // ⬅️ Tambah ini
    navigate("/qr");
  };

  const handleWorkshopSubmit = (data) => {
    const formDataObj = new FormData(); // ganti dari URLSearchParams ke FormData

    formDataObj.append("entry.1196384531", data.nama); // Nama
    formDataObj.append("entry.1175700068", data.peran); // Peran
    formDataObj.append("entry.1402885114", data.instansi || "-"); // ✅ Ganti ke ID instansi yang benar (lihat QRWorkshop.jsx)

    data.workshop.forEach((item) => {
      formDataObj.append("entry.220580591", item); // ✅ Kirim checkbox satu per satu
    });

    fetch(FORM_WORKSHOP_URL_MAIN, {
      method: "POST",
      mode: "no-cors",
      body: formDataObj,
    });

    setFormData(data);
    navigate("/qrworkshop");
  };

  const handleTalkshowSubmit = (data) => {
    const formDataObj = new URLSearchParams();

    formDataObj.append("entry.1171502749", data.nama); // Nama
    formDataObj.append("entry.1213189411", data.peran); // Peran
    formDataObj.append("entry.1795582366", data.instansi); // Instansi

    fetch(FORM_TALKSHOW_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formDataObj.toString(),
    });

    setFormData(data);
    navigate("/qrtalkshow");
  };

  const handleKeongRacunSubmit = (data) => {
    const formDataObj = new URLSearchParams();

    formDataObj.append("entry.1171502749", data.nama); // Nama
    formDataObj.append("entry.1213189411", data.peran); // Peran
    formDataObj.append("entry.1795582366", data.instansi); // Instansi

    fetch(FORM_KEONG_RACUN_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formDataObj.toString(),
    });

    setFormData(data);
    navigate("/qrkeongracun");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sr" element={<SR />} />
        <Route path="/di" element={<DI />} />
      
        <Route
          path="/landing"
          element={<LandingPage onSelect={handleSelect} />}
        />
        <Route
          path="/form"
          element={
            <FormPage
              onSubmit={handleFormSubmit}
              onBack={() => navigate("/")}
            />
          }
        />
        <Route
          path="/qr"
          element={
            <QRPage
              checkinFormUrl={FORM_PAMERAN_VIEWFORM_URL}
              formData={formData}
              onBack={() => navigate("/")}
            />
          }
        />
        <Route
          path="/workshop"
          element={
            <Workshop
              onSubmit={handleWorkshopSubmit}
              onBack={() => navigate("/")}
            />
          }
        />
        <Route
          path="/qrworkshop"
          element={
            <QRWorkshop
              checkinFormUrl={FORM_WORKSHOP_VIEWFORM_URL}
              formData={formData}
              onBack={() => navigate("/")}
            />
          }
        />
        <Route
          path="/talkshow"
          element={
            <Talkshow
              onSubmit={handleTalkshowSubmit}
              onBack={() => navigate("/")}
            />
          }
        />
        <Route
          path="/qrtalkshow"
          element={
            <QRTalkshow
              checkinFormUrl={TALKSHOW_VIEWFORM_URL}
              formData={formData}
              onBack={() => navigate("/")}
            />
          }
        />
        <Route path="/upload" element={<UploadArt />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pending" element={<PendingSubsmissionPage />} />
        <Route path="/guest" element={<GuestViewPendingPage />} />
        <Route
          path="/keongracun"
          element={
            <KeongRacun
              onSubmit={handleKeongRacunSubmit}
              onBack={() => navigate("/")}
            />
          }
        />
      </Routes>
    </div>
  );
}
