import React from "react";

const DpImages = [
  "Gambar_1.png",
  "Gambar_2.jpeg",
  "Gambar_3.jpeg",
  "Gambar_4.jpeg",
  "Gambar_5.jpeg",
  "Gambar_6.jpeg",
  "Gambar_7.jpeg",
  "Gambar_8.jpeg",
];

const DP = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center px-2 py-8"
      style={{ backgroundImage: "url('/images/bg-dp.png')" }}
    >
      <div className="max-w-3xl w-full mx-auto text-center mt-8">
        <h1 className="text-5xl md:text-6xl font-oddval font-extrabold text-yellow-300 mb-6 drop-shadow-lg">
          DESAIN PRODUK
        </h1>
        <p className="text-lg md:text-xl font-host text-white font-medium mb-10 text-justify bg-black/30 rounded-xl p-4">
Program studi Desain Produk berfokus pada perancangan produk dengan aspek fungsional dan estetika. Produk didesain secara menarik dengan tidak menghilangkan aspek fungsional yang sesuai dengan kebutuhan konsumen. Pada kurikulum ini, semester pertama pada penjurusan mempelajari dua mata kuliah khusus, yaitu Studi Bentuk & Struktur dan Pemodelan Digital. Di Studi Bentuk & Struktur, mahasiswa mempelajari konsep dasar bentuk dan visual seperti memahami struktur cara bekerjanya suatu produk. Mahasiswa juga mempelajari bagaimana material yang digunakan dapat menjadi suatu kesatuan kokoh dengan memanfaatkan bentuk yang ada tanpa bantuan alat perekat. Mata kuliah ini mengasah kemampuan mahasiswa dalam mencari solusi yang inovatif. Selain itu, pada Pemodelan Digital, mahasiswa juga mempelajari software yang dapat membuat desain visual 3 dimensi tanpa harus membuatnya secara langsung.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full mx-auto mt-4">
        {DpImages.map((img, idx) => (
          <div key={img} className="flex justify-center items-center">
            <img
              src={`/images/DP/${img}`}
              alt={`Desain Produk ${idx + 1}`}
              className="rounded-lg shadow-lg object-contain max-h-72 w-full bg-white/10"
              loading="lazy"
              onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
            />
            <noscript>{`Desain Produk ${idx + 1}`}</noscript>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DP;
