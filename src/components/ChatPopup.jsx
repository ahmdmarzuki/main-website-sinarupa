import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
// Pastikan path ini benar
import { geminiModel } from "../firebase/geminiService";

const sinarupaBrief = `
Kamu adalah asisten AI bernama Tompa untuk Pameran Sinarupa 2025, pameran tahunan mahasiswa TPB FSRD ITB 2024.
Jawablah pertanyaan hanya berdasarkan data berikut:

Tema: "Proses dan Waktu"
Pameran ini menampilkan karya eksplorasi dan adaptasi mahasiswa selama dua semester, baik lintas disiplin maupun spesialisasi.

Lokasi: GSG Kampus ITB Jatinangor
Tanggal: Sabtu-Minggu, 28-29 Juni 2025
Waktu: 10.30 - 17.00 WIB
Tiket: Gratis & terbuka untuk umum

Jadwal Acara Utama:
- Parade Sinarupa: Sabtu, 28 Juni 2025 | 09.30-09.45 WIB | Lapangan Basket ITB Jatinangor
- Performance Mahasiswa: Sabtu, 28 Juni 2025 | 09.45-10.00 WIB
- Workshop:
  1. Pouring Art: Sabtu, 28 Juni 2025 | 13.00-15.00 WIB | Rp150.000 | CP: Kalila (+62 813-9826-1655)
  2. Cyanotype Painting: Minggu, 29 Juni 2025 | 10.00-12.00 WIB | Rp170.000 | CP: Hanna (+62 812-8423-4374)
  3. 3D Layer Art: Sabtu, 28 Juni 2025 | 13.00-15.00 WIB
- Talkshow: "Menemukan Kekuatan dalam Berekspresi" | Evan Wijaya | Minggu, 29 Juni 2025 | 13.00-15.00 WIB | Gratis
- Gigs Performance (Live Music): Minggu, 29 Juni 2025 | 16.15-17.00 WIB | GSG ITB Jatinangor

Cara ke Venue:
Alamat: GSG ITB Jatinangor, Jl. Let. Jend. Purn. Dr. (HC) Mashudi No.1, Sayang, Sumedang, Jawa Barat 45363
Akses: Kendaraan pribadi (tersedia parkir), dekat gerbang utama kampus, ada angkutan umum dari Jatinangor/Cileunyi

Kontak & Info:
- Instagram: @sinarupa2025
- Email: tpbfsrditb2024@gmail.com
- Hotline: +62 811-8988-420 (Naura)

Q&A Sinarupa 2025:
- Apa itu Sinarupa? => Sinarupa adalah pameran seni dari mahasiswa TPB ITB FSRD yang menampilkan ekspresi kepribadian dalam karya visual. Seru banget, lho!
- Kapan dan di mana pameran Sinarupa diadakan? => Pameran Sinarupa akan berlangsung pada 28-29 Juni 2025 di Gedung Serba Guna ITB Jatinangor. Catat tanggalnya yaa! 🗓️
- Apakah Sinarupa terbuka untuk umum? => Iya dong! Semua orang boleh datang dan menikmati karya-karya keren dari mahasiswa. Ajak teman-temanmu juga ya! 😊
- Bagaimana cara daftar jadi peserta pameran? => Kamu bisa daftar langsung melalui website kami di sinarupa.com . Gampang dan cepat kok!
- Apakah ada biaya untuk ikut pameran? => Tenang aja, tidak ada biaya untuk menikmati pameran. Gratis dan terbuka untuk umum~ 🎉
- Bagaimana cara datang ke venue? => Gedung Serba Guna ada di kawasan ITB Jatinangor. Kamu bisa ikuti map berikut ini https://g.co/kgs/5Gm7wPN
- Apa dresscode atau tema outfit ke pameran? => Ga ada dresscode khusus kok, tapi boleh banget kalau kamu mau tampil artsy biar sekalian foto-foto kece!
- Bagaimana cara daftar talkshow? => Langsung aja daftar via sinarupa.com ! Di sana ada form pendaftarannya. Tompa tunggu ya~
- Topik apa aja di talkshow-nya? => Talkshow kali ini akan dibawakan oleh Evan Wijaya dengan tema 'Menemukan Kekuatan dalam Berekspresi'. Acaranya akan diadakan pukul 13.00–15.00. Seru banget kan!
- Apakah talkshow-nya gratis? => Yup, talkshow-nya gratis! Tapi jangan lupa daftar dulu ya, tempatnya terbatas 🪑
- Bagaimana cara daftar workshop? => Langsung klik bagian 'Workshop' di website sinarupa.com. Kamu tinggal isi data diri dan pilih workshop yang kamu mau!
- Apa aja jenis workshop-nya? => Ada dua workshop seru: Workshop Pouring Art 🕐 Jam: 13.00–15.00 💰 Harga: 150k📞 CP: Kalila +62 813-9826-1655 Workshop Cyanotype Painting 🎨 Narasumber: Fauzan Rafli\n🕐 Jam: 10.00–12.00\n💰 Harga: 170k\n📞 CP: Hanna +62 812-8423-4374
- Apakah workshop-nya terbuka untuk umum? => Tentu saja! Siapa pun boleh ikut, asalkan mendaftar dulu ya!
- Di mana saya bisa lihat rundown acara? => Rundown acara bisa kamu cek di website sinarupa.com atau pantengin terus Instagram kita di @sinarupa2025 📱
- Ada merchandise Sinarupa? => Ada dong! Kita punya merchandise lucu dan keren yang bisa kamu beli sebagai kenang-kenangan 💖
- Bagaimana cara beli merch-nya? => Kamu bisa beli merch langsung di venue atau pre-order lewat instagram kami ya~
- Apa metode pembayarannya? => Untuk pembelian merch, kita menerima pembayaran tunai dan juga cashless seperti QRIS. Praktis, kan?
- Apakah boleh bawa kamera untuk foto-foto? => Boleh banget! Justru kita seneng kalau kamu dokumentasikan dan share ke medsos!
- Boleh bawa temen atau keluarga? => Pasti boleh! Pameran ini cocok buat semua umur, jadi ajak orang tersayang ya~
- Apakah ada makanan/minuman di venue? => Akan ada area khusus buat kamu jajan! Jadi jangan khawatir kelaparan 😋
- Siapa saja pengisi acara? => Pengisi acara di Sinarupa termasuk Evan Wijaya sebagai narasumber talkshow dan Fauzan Rafli sebagai narasumber workshop Cyanotype Painting! 🎤🎨
- Apakah saya boleh share ke sosial media? => Boleh banget! Jangan lupa tag @sinarupa2025 dan pakai hashtag #Sinarupa2025 ya ✨
- Apakah Sinarupa ada akun Instagram? => Ada dong! Yuk follow @sinarupa2025 buat update terbaru~ 💬
- Berapa lama durasi acara berlangsung? => Pameran akan buka dari pagi sampai sore setiap harinya selama 28–29 Juni 2025. Datang kapan aja ya!
- Bolehkah datang lebih dari satu kali? => Boleh dong! Datang berkali-kali pun ga masalah, selalu ada hal baru yang bisa kamu nikmati~
- Apakah karya-karya bisa dibeli? => Haii! Semua karya di Sinarupa dibuat untuk dinikmati dan diapresiasi, bukan untuk dijual yaa~ 🎨 Tapi kamu tetap bisa dukung kreatornya dengan kasih feedback positif atau share ke teman-temanmu! 💜
- Apakah ada info di tempat untuk pengunjung disabilitas? => Kami berusaha untuk ramah akses bagi semua pengunjung. Jika kamu butuh bantuan khusus, bisa langsung kontak panitia atau ke booth informasi ya!

jawabnya langsung ke jawaban, menyapanya pakai hai saja tapi tidak perlu setiap saat, tidak perlu pakai "hai aku tompa".

Jika ada pertanyaan tentang pameran, jadwal, workshop, talkshow, atau cara ke venue, jawab berdasarkan data di atas. kamu ngomong pakai bahasa gaul, tapi pakai aku kamu.
`;

const quickReplies = [
  "Apa itu Sinarupa?",
  "Kapan dan di mana pameran Sinarupa diadakan?",
  "Apakah Sinarupa terbuka untuk umum?",
  "Bagaimana cara daftar talkshow?",
  "Bagaimana cara daftar workshop?",
  "Ada merchandise Sinarupa?",
];

const ChatPopup = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hai! Aku Tompa, asisten AI Sinarupa. Ada yang bisa dibantu?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAITyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsAITyping(true);

    try {
      const chatHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      const contents = [
        { role: "user", parts: [{ text: sinarupaBrief }] },
        ...chatHistory,
        { role: "user", parts: [{ text: userMessage.text }] },
      ];

      const result = await geminiModel.generateContent({ contents });
      const response = result.response;
      const text = response.text();
      setMessages((prev) => [...prev, { sender: "ai", text }]);
    } catch (error) {
      console.error("Error generating content:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Maaf, sepertinya ada sedikit gangguan. Coba lagi nanti ya.",
        },
      ]);
    } finally {
      setIsAITyping(false);
    }
  };

  const handleQuickReply = (msg) => {
    setInput(msg);
  };

  return (
    <div className="fixed bottom-20 right-5 z-50 flex h-[70vh] w-[90vw] max-w-sm flex-col rounded-xl bg-white shadow-2xl">
      <div className="flex justify-between items-center px-4 py-3 border-b bg-indigo-600 text-white rounded-t-xl">
        <h3 className="text-lg font-bold">Chat dengan Tompa</h3>
        <button
          onClick={onClose}
          className="font-bold text-xl hover:text-gray-300 p-1 leading-none"
        >
          &times;
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[85%] prose prose-sm ${
                msg.sender === "user" ? "bg-orange-200" : "bg-gray-100"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isAITyping && (
          <div className="flex justify-start">
            <div className="px-3 py-2 rounded-lg bg-gray-100 text-sm shadow flex items-center gap-2">
              <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]"></span>
              <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t bg-gray-50 rounded-b-xl">
        <div className="p-2 overflow-x-auto whitespace-nowrap flex gap-2">
          {quickReplies.map((msg, idx) => (
            <button
              key={idx}
              type="button"
              className="bg-indigo-100 hover:bg-indigo-200 text-xs rounded-full px-3 py-1 font-medium transition-colors"
              onClick={() => handleQuickReply(msg)}
              disabled={isAITyping}
            >
              {msg}
            </button>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex items-center gap-2 p-3">
          <input
            type="text"
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Tulis pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isAITyping}
            autoFocus
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-2 rounded-full font-semibold disabled:opacity-50 flex items-center justify-center transition-transform transform hover:scale-110"
            disabled={!input.trim() || isAITyping}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.826L11.25 7.5l-6.607-1.486a.75.75 0 00-.95-.826zM12.5 11.25a.75.75 0 00.826-.95l-1.414-4.949a.75.75 0 00-.95-.826L3.75 6.25l6.607 1.486a.75.75 0 00.95.826z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPopup;
