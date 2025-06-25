import React from "react";

const DiImages = [
  "Gambar-1.png",
  "Gambar-2.jpg",
  "Gambar-3.jpg",
  "Gambar-4.jpg",
  "Gambar-5.jpg",
  "Gambar-6.jpg",
  "Gambar-7.jpg",
  "Gambar-7.jpg",
];

const DI = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center px-2 py-8"
      style={{ backgroundImage: "url('/images/bg-di.png')" }}
    >
      <div className="max-w-3xl w-full mx-auto text-center mt-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-300 mb-6 drop-shadow-lg">
          DESAIN INTERIOR
        </h1>
        <p className="text-lg md:text-xl text-white font-medium mb-10 text-justify bg-black/30 rounded-xl p-4">
          Program studi Desain Interior mempelajari mengenai pengetahuan yang
          menggabungkan kreativitas, keahlian teknis dan pemahaman mendalam
          tentang respons manusia terhadap ruangan. Hal ini bertujuan untuk
          mengubah ruang menjadi lingkungan yang fungsional dan estetik. Pada
          semester pertama penjurusan, prodi ini mempelajari dua mata kuliah
          khusus yaitu Teknik Presentasi Desain Interior dan Studi Gubahan
          Ruang. Dalam mata kuliah Teknik Presentasi Desain Interior, mahasiswa
          Desain interior mempelajari berbagai tahapan dalam manual rendering.
          Selain itu, prodi ini juga mempelajari penggunaan program pemodelan
          3D untuk proses dan visualisasi penataan interior suatu ruangan. Pada
          Studi Gubahan Ruang, mahasiswa mempelajari bagaimana elemen seni
          visual seperti titik, garis, bidang, dan cahaya serta elemen dasar
          suara seperti nada, intonasi, dan volume dapat memengaruhi respons
          manusia dalam menciptakan suatu ruang.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full mx-auto mt-4">
        {DiImages.map((img, idx) => (
          <div key={img} className="flex justify-center items-center">
            <img
              src={`/images/DI/${img}`}
              alt={`Desain Interior ${idx + 1}`}
              className="rounded-lg shadow-lg object-contain max-h-72 w-full bg-white/10"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DI;
