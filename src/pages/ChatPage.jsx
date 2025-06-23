import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { geminiModel } from "../firebase/geminiService";

const geminiBrief = `
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
  "Bagaimana cara daftar jadi peserta pameran?",
  "Apakah ada biaya untuk ikut pameran?",
  "Bagaimana cara datang ke venue?",
  "Apa dresscode atau tema outfit ke pameran?",
  "Bagaimana cara daftar talkshow?",
  "Topik apa aja di talkshow-nya?",
  "Apakah talkshow-nya gratis?",
  "Bagaimana cara daftar workshop?",
  "Apa aja jenis workshop-nya?",
  "Apakah workshop-nya terbuka untuk umum?",
  "Di mana saya bisa lihat rundown acara?",
  "Ada merchandise Sinarupa?",
  "Bagaimana cara beli merch-nya?",
  "Apa metode pembayarannya?",
  "Apakah boleh bawa kamera untuk foto-foto?",
  "Boleh bawa temen atau keluarga?",
  "Apakah ada makanan/minuman di venue?",
  "Siapa saja pengisi acara?",
  "Apakah saya boleh share ke sosial media?",
  "Apakah Sinarupa ada akun Instagram?",
  "Berapa lama durasi acara berlangsung?",
  "Bolehkah datang lebih dari satu kali?",
  "Apakah karya-karya bisa dibeli?",
  "Apakah ada info di tempat untuk pengunjung disabilitas?",
];

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Halo! Aku Tompa, ada yang bisa saya bantu?" },
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

    const result = await geminiModel.generateContent([
      userMessage.text,
      geminiBrief,
    ]);
    const response = result.response;
    const text = response.text();

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: text,
        },
      ]);
      setIsAITyping(false);
    }, 700);
  };

  const handleQuickReply = (msg) => {
    setInput(msg);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-orange-50 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg flex flex-col h-[80vh]">
        <div className="px-4 py-3 border-b text-2xl font-bold text-indigo-700">
          Chatbot Sinarupa
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
                className={`px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-line text-sm shadow prose
                  ${
                    msg.sender === "user"
                      ? "bg-orange-200 text-right"
                      : "bg-indigo-100 text-left"
                  }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {/* Typing indicator */}
          {isAITyping && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-2xl bg-indigo-100 text-left text-sm shadow flex items-center gap-2">
                <span className="block w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0s]"></span>
                <span className="block w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="block w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-2 text-indigo-400">
                  Tompa sedang mengetik...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Quick Replies */}
        <div className="px-4 py-2 border-t border-b bg-indigo-50 overflow-x-auto whitespace-nowrap flex gap-2">
          {quickReplies.map((msg, idx) => (
            <button
              key={idx}
              type="button"
              className="bg-orange-200 hover:bg-orange-300 text-sm rounded-full px-4 py-1 font-medium transition-colors border border-orange-300"
              onClick={() => handleQuickReply(msg)}
              disabled={isAITyping}
            >
              {msg}
            </button>
          ))}
        </div>
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 p-4 border-t"
        >
          <input
            type="text"
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Tulis pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            disabled={isAITyping}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold disabled:opacity-50"
            disabled={!input.trim() || isAITyping}
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
