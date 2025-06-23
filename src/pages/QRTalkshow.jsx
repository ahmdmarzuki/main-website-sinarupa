import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

const QRTalkshow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;

  if (!formData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <p className="text-lg text-red-600 mb-4">
          Data tidak ditemukan. Silakan kembali ke halaman utama.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-indigo-700 text-white rounded-full hover:bg-indigo-800 transition"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  // ✅ Entry IDs dari Google Form
  const entryIDs = {
    nama: "entry.1171502749",
    peran: "entry.1213189411",
    instansi: "entry.1795582366",
  };

  const formBaseUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSeOXreyl2wlh-qevLfQ2v4yjtVbrT7KrOM_8-mG188QuCZwVw/viewform";

  // Prefill parameter
  const prefilledParams = new URLSearchParams();
  prefilledParams.append(entryIDs.nama, formData.nama);
  prefilledParams.append(entryIDs.peran, formData.peran);
  if (["Mahasiswa", "Pelajar", "Guru/Dosen"].includes(formData.peran)) {
    prefilledParams.append(entryIDs.instansi, formData.instansi || "-");
  }

  const prefilledUrl = `${formBaseUrl}?usp=pp_url&${prefilledParams.toString()}`;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center"
      style={{
        backgroundImage: 'url("/bg1.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-[#3224B9] drop-shadow">
        Pendaftaran Talkshow Berhasil
      </h2>

      <div className="bg-[#412EC8] p-4 ">
        <QRCode
          value={prefilledUrl}
          size={280}
          fgColor="#FFC964"
          bgColor="#412EC8"
        />
      </div>

      <p className="mt-6 text-lg italic text-[#3224B9]">
        Screenshot QR untuk ditunjukkan saat memasuki area talkshow
      </p>

    
      <div
        className="mt-12 relative w-fit hover:scale-105 transition cursor-pointer"
        onClick={() => navigate("/")}
      >
   
        <span className="absolute inset-0 flex items-center justify-center text-indigo-900 font-bold text-lg z-10">
          Kembali ke Beranda
        </span>

     
        <img
          src="/images/buttonbiru.png"
          alt="Kembali ke Beranda"
          className="w-56"
        />
      </div>
    </div>
  );
};

export default QRTalkshow;
