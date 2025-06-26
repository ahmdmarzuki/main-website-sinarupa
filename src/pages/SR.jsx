import React from "react";

const srImages = [
  "Gambar-1.jpg",
  "Gambar-2.jpg",
  "Gambar-3.jpeg",
  "Gambar-4.JPG",
  "Gambar-5.jpg",
  "Gambar-6.jpg",
  "Gambar-7.jpg",
  "Gambar-7.jpeg",
];

const SR = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center px-2 py-8"
      style={{ backgroundImage: "url('/images/bg-sr.png')" }}
    >
      <div className="max-w-3xl w-full mx-auto text-center mt-8">
        <h1 className="font-oddval text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg" style={{ color: '#fede5b' }}>SENI RUPA</h1>
        <p className="text-lg md:text-xl font-medium mb-10 text-justify rounded-xl p-4 font-host" style={{ color: '#fede5b' }}>
          Seni Rupa merupakan ilmu seni yang berfokus pada nilai estetika dan konseptual. Program studi ini mempelajari berbagai macam teknik, media, dan material baik tradisional maupun kontemporer. Karya yang terlahir memiliki nilai teoritis yang dikemas dalam bentuk yang estetik. Dalam perkuliahan semester pertama Seni Rupa, mahasiswa diajarkan dasar bentuk, warna, dan tekstur dengan membuat suatu modul dan menghasilkan komposisi visual yang berirama di mata kuliah Rupa Dasar Seni Rupa dalam bentuk 2 maupun 3 dimensi. Dalam mata kuliah Gambar Anatomi, mahasiswa diharapkan dapat memahami struktur dari makhluk hidup. Mata kuliah ini mempelajari struktur dan anatomi manusia dan kuda yang dituangkan dalam bentuk 2 dimensi menggunakan kertas dan pensil. Mulai dari menggores bentuk dasar yang menjadi rangka, otot yang mengatur pergerakan tubuh, hingga lapisan terluar semua bagian tersebut terkesan hidup.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full mx-auto mt-4">
        {srImages.map((img, idx) => (
          <div key={img} className="flex justify-center items-center">
            <img
              src={`/images/SR/${img}`}
              alt={`Seni Rupa ${idx + 1}`}
              className="rounded-lg shadow-lg object-contain max-h-72 w-full bg-white/10"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SR;
