import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FORM_TALKSHOW_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeLN4GtPBYj-SHbTrMEYpxNrHVH9SXmcdO_F61PzXhli8sCgw/formResponse";

export default function Talkshow() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    peran: "",
    instansi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const needsInstansi = ["Mahasiswa", "Pelajar", "Guru/Dosen"].includes(formData.peran);

    if (
      !formData.nama ||
      !formData.peran ||
      (needsInstansi && !formData.instansi)
    ) {
      alert("Mohon isi semua data dengan benar!");
      return;
    }

    const formDataObj = new URLSearchParams();
    formDataObj.append("entry.1772653607", formData.nama);          // Nama
    formDataObj.append("entry.1635964281", formData.peran);         // Peran
    formDataObj.append("entry.609681917", formData.instansi || "-"); // Instansi

    fetch(FORM_TALKSHOW_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formDataObj.toString(),
    });

    navigate("/qrtalkshow", { state: formData });
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: 'url("/images/layer.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-xl rounded-lg shadow-lg overflow-hidden">

   
        <div
          className="w-full h-32 bg-cover bg-center flex items-center justify-center mb-6"
          style={{ backgroundImage: 'url("/images/bg1.png")' }}
        >
          <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold text-[#FDE36E] drop-shadow-lg">
            Pendaftaran Talkshow
          </h1>
        </div>


        <div
          className="p-8 rounded-lg"
          style={{
            backgroundImage: 'url("/images/bg1.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
  
          <div className="mb-6">
            <label className="block font-bold mb-1 text-[#FDE36E]">Nama Lengkap</label>
            <input
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan Nama"
              className="w-full px-4 py-2 rounded border-2 border-[#E6A938] bg-transparent text-[#FDE36E] placeholder-[#FDE36E] italic focus:outline-none focus:ring-2 focus:ring-[#E6A938]"
            />
          </div>

        
          <div className="mb-6">
            <label className="block font-bold mb-1 text-[#FDE36E]">Datang Sebagai</label>
            <select
              name="peran"
              value={formData.peran}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border-2 border-[#E6A938] bg-transparent text-[#FDE36E] focus:outline-none focus:ring-2 focus:ring-[#E6A938]"
            >
              <option value="">Pilih salah satu</option>
              <option value="Mahasiswa">Mahasiswa</option>
              <option value="Pelajar">Pelajar</option>
              <option value="Guru/Dosen">Guru / Dosen</option>
              <option value="Orang Tua/Wali">Orang Tua / Wali</option>
              <option value="Umum/Masyarakat">Umum / Masyarakat</option>
            </select>
          </div>

  
          {["Mahasiswa", "Pelajar", "Guru/Dosen"].includes(formData.peran) && (
            <div className="mb-8">
              <label className="block font-bold mb-1 text-[#FDE36E]">Asal Instansi</label>
              <input
                name="instansi"
                value={formData.instansi}
                onChange={handleChange}
                placeholder="Masukkan asal institusi"
                className="w-full px-4 py-2 rounded border-2 border-[#E6A938] bg-transparent text-[#FDE36E] placeholder-[#FDE36E] italic focus:outline-none focus:ring-2 focus:ring-[#E6A938]"
              />
            </div>
          )}

<div className="flex justify-center gap-10 items-center mt-10">
  {/* Kembali */}
  <div
    role="button"
    tabIndex={0}
    onClick={() => navigate(-1)}
    className="relative w-36 text-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
  >
    <p className="absolute top-2 left-1/2 -translate-x-1/2 text-[#5C3CAF] font-bold text-lg z-10">
      Kembali
    </p>
    <img
      src="/images/buttonbiru.png"
      alt="Kembali"
      className="w-full hover:opacity-80 transition"
    />
  </div>

  {/* Submit */}
  <div
    role="button"
    tabIndex={0}
    onClick={handleSubmit}
    className="relative w-36 text-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
  >
    <p className="absolute top-2 left-1/2 -translate-x-1/2 text-[#5C3CAF] font-bold text-lg z-10">
      Submit
    </p>
    <img
      src="/images/buttonbiru.png"
      alt="Submit"
      className="w-full hover:opacity-80 transition"
    />
  </div>
</div>

      </div>
      </div>
    </div>
  );
}
