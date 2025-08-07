import { useState } from "react";
import EditFaqModal from "../modals/EditFaqModal";
import AddFaqModal from "../modals/AddFaqModal";

const FAQListPage = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<{ question: string; answer: string } | null>(null);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  // Data For Testing Only

  const faqs = [
    {
      id: 1,
      question: "How do I search for properties on Estatein?",
      answer: "You can use the search bar at the top of the homepage.",
    },
    {
      id: 2,
      question: "What documents do I need to sell my property through Estatein?",
      answer: "You need proof of ownership and a valid ID.",
    },
    {
      id: 3,
      question: "How can I contact an Estatein agent?",
      answer: "Visit the Contact Us page or call our hotline.",
    },
    {
      id: 4,
      question: "Can I schedule property visits online?",
      answer: "Yes, through our booking system on each property page.",
    },
    {
      id: 5,
      question: "Are there any fees for buyers?",
      answer: "No, buyers can use Estatein for free.",
    },
  ];

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">FAQ List</h2>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-mainPurple text-mainText px-4 py-2 rounded-md cursor-pointer"
        >
          Add New FAQ
        </button>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {faqs.map((faq) => (
          <div
            key={faq?.id}
            className="p-6 rounded-[12px] border border-borderColor bg-darkGray text-mainText cursor-pointer transition duration-200 hover:border-mainPurple"
            onClick={() => toggleFaq(faq?.id)}
          >
<div className="flex  justify-between gap-2">
  <h3 className="font-medium text-lg flex-1">{faq?.question}</h3>
  <svg
    className={`w-5 h-5 text-mainPurple transition-transform duration-300 ${
      openFaqId === faq?.id ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
</div>



            {/* Accordion content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openFaqId === faq?.id
                  ? "max-h-40 mt-4 border-t border-borderColor pt-3"
                  : "max-h-0"
              }`}
            >
              <p className="text-sm text-mainPurple">{faq?.answer}</p>
            </div>

            {/* Edit button (outside of clickable area for accordion) */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-darkGray border border-borderColor text-mainText px-4 py-2 rounded-md cursor-pointer z-10"
                onClick={(e) => {
                  e.stopPropagation(); // prevent toggle when clicking Edit
                  setCurrentFaq({ question: faq?.question, answer: faq?.answer });
                  setIsEditOpen(true);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {isEditOpen && currentFaq && (
        <EditFaqModal onClose={() => setIsEditOpen(false)} current={currentFaq} />
      )}

      {isAddOpen && <AddFaqModal onClose={() => setIsAddOpen(false)} />}
    </div>
  );
};

export default FAQListPage;

