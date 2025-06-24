import React from "react";
import MerchSection from "./MerchSection";
import MapsLocationSection from "./MapsLocationSection";
import Footer from "./Footer";

const AboutSection = () => {
  return (
    <>
      <div className="flex flex-col md:items-center md:justify-center relative md:mt-10 md:ml-20 md:max-w-7xl">
        <h1 className="text-4xl font-bold text-[#5740d2] font-oddval md:text-center">ABOUT</h1>
        <div className="relative">
          <img
            src="/images/bgOrange.png"
            className="absolute w-full h-full max-w-[2800px] ml-3"
          />
          <div className="relative text-base md:text-md mx-auto text-[#5740d2] font-host md:text-center whitespace-pre-line flex-col left-5 right-1">
            <p className="mb-5">Manusia hidup dalam dunia yang selalu mengalami perubahan. Terkadang perubahan tersebut menghadirkan situasi yang belum pernah dialami siapa pun sebelumnya. Dalam kondisi seperti itu, manusia dituntut untuk terus melangkah tanpa adanya contoh dan panduan. TPB FSRD ITB 2024 menghadapi situasi serupa ketika harus menjalani percepatan penjurusan yang sebelumnya dilakukan pada semester tiga namun kini berlangsung di semester dua. Situasi ini memaksa TPB FSRD ITB 2024 untuk beradaptasi dengan lebih cepat dalam menentukan program studi.</p>
            <p className="mb-5">Mengangkat teori Rite of Passage oleh Arnold van Gennep, proses dalam kehidupan terbagi menjadi tiga fase, yaitu melepas identitas lama pada Fase Separation, beradaptasi di fase Liminality, dan menemukan identitas baru pada fase Incorporation. Perjalanan dimulai dari fase Separation, saat meninggalkan identitas sebagai siswa dan memasuki dunia perkuliahan. Dilanjutkan dengan fase Liminality, penyesuaian diri dalam proses transisi yang diakselerasi menuju identitas baru di fase Incorporation. Perjalanan tersebut menjadi landasan Pameran Sinarupa.</p>
            <p className="mb-5">Sinarupa terlahir dari kata "Sintesis" yang berarti paduan atau penggabungan dan "Rupa" yang merujuk pada visual atau bentuk. Pameran ini menjadi ruang TPB FSRD ITB 2024 untuk menampilkan jejaknya selama satu tahun. Mulai dari mata kuliah yang mempelajari dasar rupa di Rupa Dasar Dua Dimensi dan Tiga Dimensi, hingga mata kuliah gambar, yaitu Gambar Bentuk dan Gambar Konstruktif. Enam bulan pertama ini menjadi tempat bereksplorasi yang membantu proses penentuan prodi di akhir semester. Di semester dua, mahasiswa terbagi menjadi 6 program studi, yaitu DKV, NVD, Desain Interior, Desain Produk, Seni Rupa, dan Kriya. Mata kuliah yang dipelajari di semester ini lebih fokus ke ranah program studi masing-masing. Dari perjalanan tersebut lahir karya-karya yang membentuk identitas baru dan mencapai titik akhir pada fase Incorporation.</p>
            <p>Menelusuri kembali jejak yang telah dilalui, karya-karya terbentuk melalui proses adaptasi dalam pemilihan program studi yang diakselerasi. Mulai dari rupa dua dimensi, tiga dimensi, sampai karya bebas dari setiap mahasiswa. Pameran ini bukan sekadar memamerkan hasil akhir, melainkan menunjukan bahwa desain, kriya, dan seni rupa memiliki karakteristiknya masing-masing. Melalui karya yang dipamerkan, Sinarupa menjadi bentuk reflektif dari jejak perjalanan menuju identitas baru yang telah terbentuk pada fase Incorporation.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-20 mt-25">
        {/* DATE Section */}
        <div className="flex items-center gap-4">
          <img src="/images/Jam.png" className="w-32 h-32 ml-15 mt-2"/>
          <div>
            <h1 className="text-4xl font-bold text-[#5740d2] font-oddval">DATE</h1>
            <p className="text-xl font-bold text-[#5740d2] font-host">28 – 29 Juni 2025</p>
          </div>
        </div>
        {/* LOCATION Section */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#5740d2] font-oddval">LOCATION</h1>
            <p className="text-lg font-bold text-[#5740d2] font-host">GSG ITB Jatinangor</p>
          </div>
          <img src="/images/Maps.png" className="w-32 h-32 mt-2"/>
        </div>
      </div>
    </>
  )
};

export default AboutSection;
