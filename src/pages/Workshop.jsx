import { useState } from "react";
import { useNavigate } from "react-router-dom";

const workshopOptions = [
  "Workshop 3D Layer Art",
  "Workshop Cyanotype Printing",
];

export default function Workshop({ onSubmit, onBack }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    peran: "",
    instansi: "",
    workshop: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkshopChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      let newWorkshop = [...prev.workshop];
      if (checked && !newWorkshop.includes(value)) newWorkshop.push(value);
      else if (!checked) newWorkshop = newWorkshop.filter((item) => item !== value);
      return { ...prev, workshop: newWorkshop };
    });
  };

  const handleSubmit = async () => {
    const needsInstansi = ["Mahasiswa", "Pelajar", "Guru/Dosen"].includes(formData.peran);
    if (!formData.nama.trim()) {
      alert("Nama lengkap wajib diisi!");
      return;
    }
    if (!formData.peran) {
      alert("Pilih datang sebagai apa!");
      return;
    }
    if (needsInstansi && !formData.instansi.trim()) {
      alert("Asal instansi wajib diisi!");
      return;
    }
    if (formData.workshop.length === 0) {
      alert("Pilih minimal satu workshop!");
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = {
        nama: formData.nama.trim(),
        peran: formData.peran,
        instansi: needsInstansi ? formData.instansi.trim() : "",
        workshop: formData.workshop,
      };
      if (onSubmit) {
        await onSubmit(submitData);
      } else {
        navigate("/qrworkshop", { state: submitData });
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim data.");
    } finally {
      setIsSubmitting(false);
    }
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
            Pendaftaran Workshop
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
              placeholder="Masukkan nama lengkap"
              disabled={isSubmitting}
              className="w-full px-4 py-2 rounded border-2 border-[#E6A938] bg-transparent text-[#FDE36E] placeholder-[#FDE36E] italic focus:outline-none focus:ring-2 focus:ring-[#E6A938]"
            />
          </div>

      
          <div className="mb-6">
            <label className="block font-bold mb-1 text-[#FDE36E]">Datang Sebagai</label>
            <select
              name="peran"
              value={formData.peran}
              onChange={handleChange}
              disabled={isSubmitting}
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
            <div className="mb-6">
              <label className="block font-bold mb-1 text-[#FDE36E]">Asal Instansi</label>
              <input
                name="instansi"
                value={formData.instansi}
                onChange={handleChange}
                placeholder="Masukkan asal institusi"
                disabled={isSubmitting}
                className="w-full px-4 py-2 rounded border-2 border-[#E6A938] bg-transparent text-[#FDE36E] placeholder-[#FDE36E] italic focus:outline-none focus:ring-2 focus:ring-[#E6A938]"
              />
            </div>
          )}


          <div className="mb-6">
            <label className="block font-bold mb-2 text-[#FDE36E]">Workshop yang Diikuti</label>
            <div className="flex flex-col gap-3">
              {workshopOptions.map((option) => (
                <label key={option} className="flex items-center gap-2 text-[#FDE36E]">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.workshop.includes(option)}
                    onChange={handleWorkshopChange}
                    disabled={isSubmitting}
                    className="accent-[#E6A938] w-4 h-4"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

   
          <div className="flex justify-center gap-10 items-center mt-10">
  {/* Tombol Kembali */}
  <div
    role="button"
    tabIndex={0}
    onClick={() => (onBack ? onBack() : navigate("/landing"))}
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

  {/* Tombol Submit */}
  <div
    role="button"
    tabIndex={0}
    onClick={handleSubmit}
    className={`relative w-36 text-center cursor-pointer transition-transform hover:scale-105 active:scale-95 ${
      isSubmitting ? "pointer-events-none opacity-50" : ""
    }`}
  >
    <p className="absolute top-2 left-1/2 -translate-x-1/2 text-[#5C3CAF] font-bold text-lg z-10">
      {isSubmitting ? "Mengirim..." : "Submit"}
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
