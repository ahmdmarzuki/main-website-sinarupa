import React from "react";
import Accordion from "../components/Accordion";

const faqData = [
  {
    question: "Apa itu Sinarupa?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet tincidunt, nunc nisl aliquam nunc, eget aliquam nunc nisl eu nunc.",
  },
  {
    question: "Bagaimana cara mengikuti event?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi eu nisi.",
  },
  {
    question: "Apakah karya harus orisinil?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Etiam euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi eu nisi.",
  },
  {
    question: "Kapan pengumuman pemenang?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Etiam euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi eu nisi.",
  },
  {
    question: "Apakah ada biaya pendaftaran?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
  },
  {
    question: "Bagaimana cara submit karya?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac neque nec erat cursus posuere.",
  },
];

const FaqSection = () => {
  // Bagi data menjadi 2 kolom untuk desktop
  const mid = Math.ceil(faqData.length / 2);
  const col1 = faqData.slice(0, mid);
  const col2 = faqData.slice(mid);

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">FAQ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kolom 1 */}
        <div className="flex flex-col gap-2">
          {col1.map((item, idx) => (
            <Accordion
              key={idx}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
        {/* Kolom 2 */}
        <div className="flex flex-col gap-2">
          {col2.map((item, idx) => (
            <Accordion
              key={mid + idx}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
