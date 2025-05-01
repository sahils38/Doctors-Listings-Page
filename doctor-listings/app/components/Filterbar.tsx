

"use client";

import { useState, useEffect } from 'react';
import styles from './Filterbar.module.css';

type FilterCategory = 
  | 'consultationType' 
  | 'experience' 
  | 'fees'
  | 'languages';

export type FilterOptions = Record<FilterCategory, string[]>;

type FilterOptionItem = {
  id: string;
  label: string;
};

type Props = {
  onFilterChange: (filters: FilterOptions) => void;
};

const FilterSidebar = ({ onFilterChange }: Props) => {
  const [filters, setFilters] = useState<FilterOptions>({
    consultationType: [],
    experience: [],
    fees: [],
    languages: [],
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const filterOptions: Record<FilterCategory, FilterOptionItem[]> = {
    consultationType: [
      { id: 'hospital', label: 'Hospital Visit' },
      { id: 'online', label: 'Online Consult' }
    ],
    experience: [
      { id: '0-5', label: '0-5' },
      { id: '6-10', label: '6-10' },
      { id: '11-16', label: '11-16' },
      { id: '17+', label: '17+' }
    ],
    fees: [
      { id: '100-500', label: '100-500' },
      { id: '500-1000', label: '500-1000' },
      { id: '1000+', label: '1000+' }
    ],
    languages: [
      { id: 'english', label: 'English' },
      { id: 'hindi', label: 'Hindi' },
      { id: 'telugu', label: 'Telugu' }
    ]
  };

  const handleFilterChange = (category: FilterCategory, id: string) => {
    setFilters(prev => {
      const currentValues = prev[category];
      const newValues = currentValues.includes(id)
        ? currentValues.filter(item => item !== id)
        : [...currentValues, id];
      return { ...prev, [category]: newValues };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      consultationType: [],
      experience: [],
      fees: [],
      languages: [],
    });
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.topRow}>
        <h3 className={styles.sidebarTitle}>Filters</h3>
        <button className={styles.clearButton} onClick={clearAllFilters}>Clear All</button>
      </div>

      <button className={styles.nearMeButton}>Show Doctors Near Me</button>

      {(Object.keys(filterOptions) as FilterCategory[]).map(category => (
        <div key={category} className={styles.filterGroup}>
          <h4 className={styles.filterTitle}>
            {category === 'consultationType' ? "Mode of Consult" :
             category === 'experience' ? "Experience (In Years)" :
             category === 'fees' ? "Fees (In Rupees)" :
             "Language"}
          </h4>
          {filterOptions[category].map(option => (
            <label key={option.id} className={styles.filterItem}>
              <input
                type="checkbox"
                checked={filters[category].includes(option.id)}
                onChange={() => handleFilterChange(category, option.id)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
