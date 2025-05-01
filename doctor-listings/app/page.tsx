"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Header from "@/app/components/header";
import Filterbar, { FilterOptions } from "@/app/components/Filterbar";
import DoctorList from "@/app/components/DoctorList";
import Info from "@/app/components/info";
import FaqSection from "@/app/components/FaqSection";
import Footer from "@/app/components/Footer";

export default function Home() {
  const [filters, setFilters] = useState<FilterOptions>({
    consultationType: [],
    experience: [],
    fees: [],
    languages: [],
  });

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <main>
      <Header />
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Filterbar onFilterChange={handleFilterChange} />
        </div>
        <div className={styles.doctorList}>
          <h1 className={styles.heading}>
            Consult General Physicians Online - Internal Medicine Specialists
          </h1>
          <DoctorList filters={filters} />
        </div>
      </div>
      <hr className={styles.rounded}></hr>
      <div className={styles.info}>
        <Info />
      </div>
      <div className={styles.faq}>
        <FaqSection />
      </div>
      <Footer />
    </main>
  );
}
