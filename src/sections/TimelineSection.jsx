import React from "react";

const TimelineSection = () => {
  const timelineEvents = [
    {
      id: 1,
      title: "Event Sinarupa 2023",
      date: "Desember 2023",
      description:
        "Pameran seni rupa yang menghadirkan karya-karya terbaik dari seniman lokal dan nasional.",
    },
    {
      id: 2,
      title: "Workshop Seni Digital",
      date: "November 2023",
      description:
        "Workshop intensif tentang seni digital yang diikuti oleh 50+ peserta.",
    },
    {
      id: 3,
      title: "Kompetisi Seni Mural",
      date: "Oktober 2023",
      description:
        "Kompetisi mural tingkat nasional yang mengangkat tema keberagaman budaya Indonesia.",
    },
    {
      id: 4,
      title: "Pameran Seni Kontemporer",
      date: "September 2023",
      description:
        "Pameran seni kontemporer yang menampilkan karya-karya inovatif dari seniman muda.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Timeline Event Sebelumnya
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Melihat kembali moment-moment berharga dari event-event Sinarupa
            yang telah berlangsung
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {event.date}
                    </p>
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    {/* Dummy image box */}
                    <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 font-medium">
                        Image Placeholder
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
