
import FaqItem from "./FaqItem";

const faqData = [
  {
    question: "What is the role of a general physician or GP?",
    answer:
      "A general physician or GP is the first point of contact for patients seeking medical care. They diagnose and treat a wide range of health issues, from minor illnesses to chronic conditions, and provide preventive care. They also refer patients to specialists when necessary.",
  },
  {
    question: "When should I visit a general physician for a fever?",
    answer: "If your fever persists for more than 2 days or crosses 101°F, you should consult a general physician.",
  },
  {
    question: "Can a general physician help manage my diabetes?",
    answer: "Yes, general physicians are trained to help manage chronic conditions like diabetes and can recommend lifestyle changes or medication.",
  },
  {
    question: "When should I visit a general physician for a fever?",
    answer: "If your fever persists for more than 2 days or crosses 101°F, you should consult a general physician.",
  },
  {
    question: "Can a general physician help manage my diabetes?",
    answer: "Yes, general physicians are trained to help manage chronic conditions like diabetes and can recommend lifestyle changes or medication.",
  },{
    question: "When should I visit a general physician for a fever?",
    answer: "If your fever persists for more than 2 days or crosses 101°F, you should consult a general physician.",
  },
  {
    question: "Can a general physician help manage my diabetes?",
    answer: "Yes, general physicians are trained to help manage chronic conditions like diabetes and can recommend lifestyle changes or medication.",
  },
  
];

const FaqSection = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "40px 50px", padding: "0 20px" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "20px" }}>FAQs</h2>
      {faqData.map((faq, index) => (
        <FaqItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FaqSection;
