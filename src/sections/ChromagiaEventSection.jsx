import React from "react";

const BoxCluster = () => (
  <div className="relative w-52 h-52 scale-90">
    {/* Central Dark Box */}
    <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 rounded-md"></div>

    {/* Left Box */}
    <div className="absolute top-[55%] left-[10%] w-20 h-20 bg-gray-300 rounded-md"></div>

    {/* Top Right Box */}
    <div className="absolute top-[15%] left-[50%] w-24 h-24 bg-gray-300 rounded-md"></div>

    {/* Bottom Right Box (overlapping) */}
    <div className="absolute top-[50%] left-[55%] w-20 h-20 bg-gray-300 rounded-md"></div>
  </div>
);

const TimelineArrow = () => (
  <div className="flex justify-center my-4">
    <svg
      className="w-6 h-6 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      ></path>
    </svg>
  </div>
);

const ChromagiaEventSection = () => {
  const timelineStages = [
    {
      id: 1,
      title: "Separation",
      type: "cluster",
      description:
        "Fase awal Chromagia 2023, di mana para seniman dan pengunjung meninggalkan rutinitas untuk memasuki dunia seni yang imersif. Ditandai dengan Opening Ceremony yang megah.",
    },
    {
      id: 2,
      title: "Liminality",
      type: "image",
      description:
        "Inti dari Chromagia, sebuah ruang 'di antara' di mana transformasi terjadi. Fase ini diisi dengan pameran karya, workshop, dan live painting, menciptakan pengalaman seni yang mendalam.",
      imageUrl: "/images/chromagia-liminality.jpg", // Ganti dengan path gambar yang sesuai
    },
    {
      id: 3,
      title: "Incorporation",
      type: "cluster",
      description:
        "Fase akhir di mana para peserta kembali ke dunia sehari-hari dengan membawa pengalaman dan inspirasi baru. Ditutup dengan lelang karya amal dan closing ceremony yang berkesan.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-800 tracking-wider">
            Linimasa
          </h2>
        </div>

        <div className="flex flex-col items-center">
          {timelineStages.map((stage, index) => (
            <React.Fragment key={stage.id}>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-700">
                  {stage.title}
                </h3>
              </div>

              <TimelineArrow />

              <div className="w-full max-w-lg mx-auto flex justify-center mb-8">
                {stage.type === "cluster" ? (
                  <BoxCluster />
                ) : (
                  <div className="bg-white p-4 rounded-2xl shadow-2xl border w-full">
                    <div className="w-full h-72 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                      {/* Ganti div ini dengan tag <img> setelah gambar tersedia */}
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">
                          Image Placeholder for {stage.title}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 mt-2">
                      <h4 className="font-bold text-xl text-gray-800 mb-2">
                        {stage.title}
                      </h4>
                      <p className="text-gray-600">{stage.description}</p>
                    </div>
                  </div>
                )}
              </div>

              {index < timelineStages.length - 1 && <TimelineArrow />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChromagiaEventSection;
