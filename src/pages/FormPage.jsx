import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schedule = ["Sabtu, 28 Juni 2025", "Minggu, 29 Juni 2025"];

export default function FormPage({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    nama: "",
    peran: "",
    instansi: "",
    jumlah: "",
    hari: [],
  });

  const navigate = useNavigate();

  const handleHariChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      let newHari = [...prev.hari];
      if (checked && !newHari.includes(value)) newHari.push(value);
      else if (!checked) newHari = newHari.filter((h) => h !== value);
      return { ...prev, hari: newHari };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "peran") {
      setFormData((prev) => ({
        ...prev,
        peran: value,
        instansi: ["Mahasiswa", "Pelajar", "Guru/Dosen"].includes(value)
          ? prev.instansi
          : "",
      }));
      return;
    }
    if (name === "jumlah") {
      if (value === "") {
        setFormData((prev) => ({ ...prev, jumlah: "" }));
        return;
      }
      if (Number(value) > 3) return;
      setFormData((prev) => ({ ...prev, jumlah: value }));
      return;
    }
    if (name !== "hari") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (
      !formData.nama ||
      !formData.peran ||
      (["Mahasiswa", "Pelajar", "Guru/Dosen"].includes(formData.peran) &&
        !formData.instansi) ||
      !formData.jumlah ||
      formData.hari.length === 0
    ) {
      alert("Mohon mengisi semua data dengan benar!");
      return;
    }
    onSubmit(formData);
    navigate("/qr");
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
        {/* Header */}
        <div
          className="w-full h-32 bg-cover bg-center flex items-center justify-center mb-6"
          style={{ backgroundImage: 'url("/images/bg1.png")' }}
        >
          <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold text-[#FDE36E] drop-shadow-lg">
            Pendaftaran Pameran
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

          {/* Peran */}
          <div className="mb-6">
            <label className="block font-bold mb-1 text-[#FDE36E]">Datang Sebagai</label>
            <select
              name="peran"
              value={formData.peran}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border-2 border-[#E6A938] bg-transparent text-[#FDE36E] focus:outline-none focus:ring-2 focus:ring-[#E6A938]"
            >
              <option value="">Pilih salah satu</option>
              {["Mahasiswa", "Pelajar", "Guru/Dosen", "Orang Tua/Wali", "Umum/Masyarakat"].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Instansi */}
          {["Mahasiswa", "Pelajar", "Guru/Dosen"].includes(formData.peran) && (
            <div className="mb-6">
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


          <div className="mb-6">
            <label className="block font-bold mb-1 text-[#FDE36E]">Jumlah Tiket</label>
            <input
              type="number"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              placeholder="Masukkan angka"
              min="1"
              max="3"
              className="w-full px-4 py-2 rounded border-2 border-[#E6A938] bg-transparent text-[#FDE36E] placeholder-[#FDE36E] italic focus:outline-none focus:ring-2 focus:ring-[#E6A938]"
            />
            <p className="text-sm text-[#FDE36E] mt-1 italic">
              *maksimal 3 pemesanan tiket
            </p>
          </div>

   
          <div className="mb-6">
            <span className="block font-bold mb-2 text-[#FDE36E]">Hari Kunjungan</span>
            <div className="flex gap-6 flex-wrap">
              {schedule.map((day) => (
                <label key={day} className="flex items-center gap-2 cursor-pointer font-bold text-[#FDE36E]">
                  <input
                    type="checkbox"
                    name="hari"
                    value={day}
                    checked={formData.hari.includes(day)}
                    onChange={handleHariChange}
                    className="accent-[#E6A938] cursor-pointer"
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-10 items-center mt-10">

  <div className="relative w-36 text-center cursor-pointer" onClick={onBack}>
    <p className="absolute top-2 left-1/2 -translate-x-1/2 text-[#5C3CAF] font-bold text-lg z-10">
      Kembali
    </p>
    <img
      src="/images/buttonbiru.png"
      alt="Kembali"
      className="w-full hover:opacity-80 transition"
    />
  </div>


  <div className="relative w-36 text-center cursor-pointer" onClick={handleSubmit}>
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
