import React from "react";

const srImages = [
  "KR1.jpg",
  "KR2.jpg",
  "KR3.png",
  "KR4.png",
  "KR5.PNG",
  "KR6.png",
  "KR7.jpg",
  "KR8.png",
];

const KR = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center px-2 py-8"
      style={{ 
        backgroundImage: "url('/images/bg-kr.png')",
        backgroundSize: '105% 110%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-3xl w-full mx-auto text-center mt-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-300 mb-6 font-oddval drop-shadow-lg">KRIYA</h1>
        <p className="text-lg md:text-xl text-white font-medium mb-10 text-justify bg-black/30 font-host rounded-xl p-4">
          Program studi Kriya merupakan program studi yang mempelajari tentang ilmu keterampilan untuk menghasilkan suatu karya yang bernilai estetik dan fungsional. Prosesnya melibatkan pengolahan berbagai macam material yang bertumpu pada kreativitas, keterampilan, dan penguasaan medium. Prodi Kriya juga berkaitan erat dengan sejarah, lingkungan, dan tradisi masyarakat dengan fokus pemanfaatan ragam kriya di Indonesia yang tervisualisasi melalui hasil karya tradisional maupun modern. Rupa Dasar Kriya merupakan salah satu mata kuliah pada semester penjurusan. Mata kuliah ini mempelajari eksplorasi berbagai medium dengan memanfaatkan unsur objek alam dan memperhatikan teknik pembentukan, struktur, dan karakter dari objek tersebut. Pada mata kuliah Gambar Dasar Kriya, mahasiswa mempelajari ragam hias untuk melatih eksplorasi melalui bentuk, garis, dan titik, serta pembuatan bentuk budaya seperti batik dan tenun dengan menggunakan teknik manual maupun digital.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full mx-auto mt-4">
        {srImages.map((img, idx) => (
          <div key={img} className="flex justify-center items-center">
            <img
              src={`/images/KR/${img}`}
              alt={`Kriya ${idx + 1}`}
              className="rounded-lg shadow-lg object-contain max-h-72 w-full bg-white/10"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KR;


