"use client";

import styles from './DoctorCard.module.css';

type DoctorCardProps = {
  imageUrl: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  totalRatings: number;
  onlineFees: number;
  hospitalFees: number;
};

const DoctorCard = ({
  imageUrl,
  name,
  specialization,
  experience,
  rating,
  totalRatings,
  onlineFees,
  hospitalFees
}: DoctorCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <img src={imageUrl} alt={name} className={styles.image} />
      </div>

      <div className={styles.right}>
        <div className={styles.header}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.specialization}>{specialization}</p>
          <p className={styles.experience}>{experience}+ years of experience</p>
        </div>

        <div className={styles.middle}>
          <span className={styles.rating}>★ {rating.toFixed(1)}</span>
          <span className={styles.totalRatings}>({totalRatings}+ ratings)</span>
        </div>

        <div className={styles.fees}>
          <div>
            <p className={styles.feeLabel}>Online Consultation Fee</p>
            <p className={styles.fee}>₹{onlineFees}</p>
          </div>
          <div>
            <p className={styles.feeLabel}>Clinic Consultation Fee</p>
            <p className={styles.fee}>₹{hospitalFees}</p>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.consultButton}>Consult Now</button>
          <button className={styles.visitButton}>Book Clinic Visit</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
