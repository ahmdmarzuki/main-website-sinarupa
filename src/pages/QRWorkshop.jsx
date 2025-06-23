import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

export default function QRWorkshop({ formData }) {
  const navigate = useNavigate();

  const entryIDs = {
    nama: "entry.601827886",
    peran: "entry.1719151915",
    instansi: "entry.1402885114",
    workshop: "entry.83801753",
  };

  const prefilledParams = new URLSearchParams();
  prefilledParams.append(entryIDs.nama, formData.nama);
  prefilledParams.append(entryIDs.peran, formData.peran);
  prefilledParams.append(entryIDs.instansi, formData.instansi);
  prefilledParams.append(entryIDs.workshop, formData.workshop.join(", "));

  const formBaseUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSf8nBUwRI8LH_B3uyFZFQLpgHKmLcf55_G0Akn_p-CRO231Fg/viewform";

  const prefilledUrl = `${formBaseUrl}?usp=pp_url&${prefilledParams.toString()}`;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center"
      style={{
        backgroundImage: "url('/images/layer.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="text-5xl font-bold mb-8 text-[#3224B9] drop-shadow">
        Pendaftaran Workshop Berhasil
      </h2>

      <div className="bg-[#412EC8] p-4 rounded">
        <QRCode
          value={prefilledUrl}
          size={280}
          fgColor="#FFC964"
          bgColor="#412EC8"
        />
      </div>

      <p className="mt-6 text-lg italic text-[#3224B9]">
        Screenshot QR untuk ditunjukkan saat memasuki area workshop
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
}
