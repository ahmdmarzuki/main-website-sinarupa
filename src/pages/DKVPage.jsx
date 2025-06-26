import React from "react";

const dkvImages = [
  "DKV1.png",
  "DKV2.png",
  "DKV3.png",
  "DKV4.jpg",
  "DKV5.jpg",
  "DKV6.jpg",
];

const DKVPage = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center px-2 py-8"
      style={{ backgroundImage: "url('/images/bg-dkv.png')" }}
    >
      <div className="max-w-3xl w-full mx-auto text-center mt-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-300 mb-6 drop-shadow-lg font-oddval">DESAIN KOMUNIKASI VISUAL</h1>
        <p className="text-lg md:text-xl font-host text-white font-medium mb-10 text-justify bg-black/30 rounded-xl p-4">
        Desain Komunikasi Visual dan Narasi Visual Digital merupakan cabang ilmu yang mendalami konsep komunikasi melalui elemen rupa. DKV bertujuan untuk menyampaikan suatu ide berbentuk pesan maupun informasi melalui desain visual dan NVD mempelajari ilmu komunikasi melalui penyampaian cerita atau storytelling seperti animasi, komik, film, teknologi CGI, dan yang lainnya. Prodi ini mempelajari dua mata kuliah khusus di semester pertama penjurusan, yaitu Dasar-Dasar DKV dan Dasar-Dasar Ilustrasi. Pada Dasar-Dasar DKV, mahasiswa mempelajari tipografi, penggunaan bentuk, dan permainan warna untuk menciptakan komposisi visual yang unik dan estetis. Kemudian, di mata kuliah Dasar-Dasar Ilustrasi dipelajari tentang dasar dalam pembuatan ilustrasi, bagaimana memvisualisasikan suatu karakter sesuai dengan sifatnya. Selain itu, mahasiswa juga mempelajari struktur visual, pencahayaan, dan focal point yang berperan penting dalam penyampaian pesan melalui sebuah ilustrasi.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full mx-auto mt-4">
        {dkvImages.map((img, idx) => (
          <div key={img} className="flex justify-center items-center">
            <img
              src={`/images/DKV/${img}`}
              alt={`DKV ${idx + 1}`}
              className="rounded-lg shadow-lg object-contain max-h-72 w-full bg-white/10"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DKVPage;