import React from "react";

const ModalDisclaimer = ({ onAgree, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
    <div className="bg-white rounded-xl shadow-xl max-w-md w-full my-16 p-6 overflow-y-auto">
      <div className=" overflow-y-auto">
        <h1 className="">DISCLAIMER</h1>
        <p className="">
          Hai, aku Tompa!
          <br />
          Selamat datang dan makasih sudah ngobrol sama aku~
          <br />
          Sebelum kita lanjut, ada beberapa hal penting yang perlu kamu tahu,
          ya!
        </p>
        <div className="">
          <ol>
            <li>Aku bukan manusia, tapi aku berusaha bantu sebisa mungkin!</li>
            <li>
              Aku adalah chatbot untuk bantu jawab pertanyaan kamu soal acara
              ini. Tapi kadang-kadang jawabanku bisa aja kurang tepat. Kalau
              ragu, tanya ke panitia ya!
            </li>
            <li>Jangan terlalu serius sama semua jawabanku.</li>
            <li>
              Aku belajar dari banyak data, tapi aku bukan sumber kebenaran
              mutlak. Info penting atau sensitif? Konfirmasi ke panitia juga!
            </li>
            <li>Privasi kamu aman kok!</li>
            <li>
              Aku nggak simpan data pribadi kamu. Obrolan ini cuma buat bantu
              kamu selama acara aja.
            </li>
            <li>Gunakan aku dengan bijak.</li>
            <li>
              Jangan ngobrol hal-hal yang nggak pantas, nyesatin, atau
              aneh-aneh. Yuk jaga suasana tetap seru!
            </li>
            <li>Aku siap nemenin kamu!</li>
            <li>
              Kalau kamu butuh bantuan dari manusia, aku bakal kasih info ke
              mana kamu bisa pergi.
            </li>
          </ol>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          Tutup
        </button>
        <button
          onClick={onAgree}
          className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        >
          Setuju & Lanjut Chat
        </button>
      </div>
    </div>
  </div>
);

export default ModalDisclaimer;
