'use client';

import { useState, useEffect, useRef } from 'react';
import DoctorCard from './DoctorCard';

type Doctor = {
  name: string;
  imageUrl: string;
  specialty: string;
  experience: number;
  consultationFee: number;
  modeOfConsult: string[];
  languages: string[];
};

type FilterOptions = {
  consultationType: string[];
  experience: string[];
  fees: string[];
  languages: string[];
};

type DoctorListProps = {
  filters: FilterOptions;
};

export default function DoctorList({ filters }: DoctorListProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const fetchDoctors = async () => {
    setLoading(true);
    const params = new URLSearchParams();

    if (filters.consultationType.length) {
      params.append('consultationType', filters.consultationType.join(','));
    }

    if (filters.languages.length) {
      params.append('languages', filters.languages.join(','));
    }

    const experiences = filters.experience.map(range => {
      if (range === '17+') return { min: 17, max: undefined };
      const [min, max] = range.split('-');
      return { min: Number(min), max: Number(max) };
    });

    if (experiences.length) {
      const minExperience = Math.min(...experiences.map(exp => exp.min));
      const maxExperience = Math.max(...experiences.map(exp => exp.max ?? 100));
      params.append('minExperience', minExperience.toString());
      if (experiences.some(exp => exp.max !== undefined)) {
        params.append('maxExperience', maxExperience.toString());
      }
    }

    const feeValues = filters.fees.map((range: string) => {
      if (range === '1000+') return { min: 1000 };
      const [minStr, maxStr] = range.split('-');
      return { min: Number(minStr), max: Number(maxStr) };
    });

    let minFee: number | undefined = undefined;
    let maxFee: number | undefined = undefined;

    feeValues.forEach((fee: { min: number; max?: number }) => {
      if (fee.min !== undefined) {
        minFee = minFee !== undefined ? Math.min(minFee, fee.min) : fee.min;
      }
      if (fee.max !== undefined) {
        maxFee = maxFee !== undefined ? Math.max(maxFee, fee.max) : fee.max;
      }
    });

    if (minFee !== undefined) {
      params.append('minConsultationFee', String(minFee));
    }
    if (maxFee !== undefined) {
      params.append('maxConsultationFee', String(maxFee));
    }

    params.append('page', currentPage.toString());
    params.append('limit', '4');

    try {
      const res = await fetch(`http://localhost:5000/api/doctors?${params.toString()}`);
      const json = await res.json();
      setDoctors(json.data);
      setTotalPages(json.pagination.totalPages);
    } catch (err) {
      console.error('Failed to fetch doctors', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1); 
  }, [filters]);

  useEffect(() => {
    fetchDoctors();
  }, [filters, currentPage]);

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={topRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '40px', fontWeight: 600, fontSize: '18px', color: '#005f5f' }}>
          <div className="spinner" style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #005f5f',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto',
            marginBottom: '16px'
          }} />
          Loading doctors...
        </div>
      ) : (
        <>
          {doctors.map((doctor, index) => (
            <DoctorCard
              key={index}
              name={doctor.name}
              imageUrl={doctor.imageUrl}
              specialization={doctor.specialty}
              experience={doctor.experience}
              rating={4.5}
              totalRatings={1000}
              onlineFees={doctor.consultationFee}
              hospitalFees={doctor.consultationFee}
            />
          ))}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              style={{
                backgroundColor: '#005f5f',
                color: '#fff',
                padding: '10px 18px',
                borderRadius: '6px',
                border: 'none',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1,
                pointerEvents: currentPage === 1 ? 'none' : 'auto'
              }}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{
                backgroundColor: '#005f5f',
                color: '#fff',
                padding: '10px 18px',
                borderRadius: '6px',
                border: 'none',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                marginLeft: '10px',
                opacity: currentPage === totalPages ? 0.5 : 1,
                pointerEvents: currentPage === totalPages ? 'none' : 'auto'
              }}
            >
              Next
            </button>
          </div>
        </>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
