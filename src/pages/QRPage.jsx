import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

export default function QRPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const formData = location.state || JSON.parse(localStorage.getItem("formData"));

  if (!formData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
        <p className="text-xl text-red-600 font-semibold mb-4">Data tidak ditemukan.</p>
        <button
  onClick={() => {
    localStorage.removeItem("formData");
    navigate("/");
  }}
  className="mt-10 px-8 py-3 bg-indigo-700 text-white font-semibold text-lg rounded-full shadow-xl hover:bg-indigo-800 transition"
>
Kembali ke Beranda
</button>

      </div>
    );
  }

  
  const entryIDs = {
    nama: "entry.1155013040",
    peran: "entry.703753725",
    instansi: "entry.1855181923",
    jumlah: "entry.1039214476",
    hari: "entry.2016144108",
  };

  const formBaseUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSeMGH4UPUGe2JDwOP1v1tFaF2FpyJZyGuIL1Dgq96uVmjYGsg/viewform";
  const prefilledParams = new URLSearchParams();
  prefilledParams.append(entryIDs.nama, formData.nama);
  prefilledParams.append(entryIDs.peran, formData.peran);
  prefilledParams.append(entryIDs.instansi, formData.instansi || "-");
  prefilledParams.append(entryIDs.jumlah, formData.jumlah);
  prefilledParams.append(entryIDs.hari, formData.hari.join(", "));

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
      <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-10">
        Pendaftaran Pameran Berhasil
      </h1>

      <div className="bg-[#412EC8] p-4 ">
        <QRCode
          value={prefilledUrl}
          size={280}
          fgColor="#FFC964"
          bgColor="#412EC8"
        />
      </div>


      <p className="mt-6 text-indigo-800 italic">
      Screenshoot QR untuk ditunjukkan pada saat memasuki area pameran
      </p>

      <div className="mt-15 relative w-fit hover:scale-105 transition cursor-pointer" onClick={() => navigate("/")}>


  <span className="absolute inset-0 flex items-center justify-center text-indigo-900 font-bold text-lg z-10">
    Kembali ke Beranda
  </span>

  {/* button */}
  <img
    src="/images/buttonbiru.png"
    alt="Kembali ke Beranda"
    className="w-55"
  />
</div>


    </div>
  );
}
