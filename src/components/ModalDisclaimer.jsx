import React from "react";
import { useMediaQuery } from "../useMediaQuery";

const ModalDisclaimer = ({ onAgree, onClose }) => {
  return (
    <div className="w-full h-[400px] md:h-[500px] bg-white rounded-xl shadow-xl p-4 md:p-6 flex flex-col overflow-y-auto text-[#3224ba]">
      <h1 className="text-center font-oddval text-[#3224ba] text-lg md:text-2xl mb-2">DISCLAIMER</h1>
      <p className="text-sm md:text-base mb-2">
        Hai, aku Tompa!<br />
        Selamat datang dan makasih sudah ngobrol sama aku~<br />
        Sebelum kita lanjut, ada beberapa hal penting yang perlu kamu tahu, ya!
      </p>
      <div className="text-sm md:text-base flex-1 overflow-y-auto">
        <ol className="list-decimal list-inside space-y-1">
          <li> Aku bukan manusia, tapi aku berusaha bantu sebisa mungkin! </li>
          <li> Aku adalah chatbot untuk bantu jawab pertanyaan kamu soal acara ini. Tapi kadang-kadang jawabanku bisa aja kurang tepat. Kalau ragu, tanya ke panitia ya! </li>
          <li> Jangan terlalu serius sama semua jawabanku. </li>
          <li> Aku belajar dari banyak data, tapi aku bukan sumber kebenaran mutlak. Info penting atau sensitif? Konfirmasi ke panitia juga! </li>
          <li> Privasi kamu aman kok! </li>
          <li> Aku nggak simpan data pribadi kamu. Obrolan ini cuma buat bantu kamu selama acara aja. </li>
          <li> Gunakan aku dengan bijak. </li>
          <li> Jangan ngobrol hal-hal yang nggak pantas, nyesatin, atau aneh-aneh. Yuk jaga suasana tetap seru! </li>
          <li> Aku siap nemenin kamu! </li>
          <li> Kalau kamu butuh bantuan dari manusia, aku bakal kasih info ke mana kamu bisa pergi. </li>
        </ol>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-2 mt-4">
        <button
          onClick={onClose}
          className="w-full md:w-auto px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm md:text-base"
        >
          Tutup
        </button>
        <button
          onClick={onAgree}
          className="w-full md:w-auto px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm md:text-base"
        >
          Setuju & Lanjut Chat
        </button>
      </div>
    </div>
  );
};

export default ModalDisclaimer;
