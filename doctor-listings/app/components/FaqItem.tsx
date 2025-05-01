// components/FaqItem.tsx
"use client";

import { useState } from "react";
import styles from "./FaqItem.module.css";
import { ChevronDown, ChevronUp } from "lucide-react";

type FaqItemProps = {
  question: string;
  answer: string;
};

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.faqItem}>
      <button className={styles.question} onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && <p className={styles.answer}>{answer}</p>}
      <div className={styles.divider} />
    </div>
  );
};

export default FaqItem;
