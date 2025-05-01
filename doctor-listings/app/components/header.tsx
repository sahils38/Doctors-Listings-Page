import styles from './header.module.css';
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";

export default function Header() {
    return (
        <>
           

         
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <img 
                        className={styles.logo} 
                        src="https://i.tracxn.com/logo/company/download_1590122969225.png" 
                        alt="Apollo 247"
                    />
                    
                    <div className={styles.location}>
                        <CiLocationOn className={styles.locationIcon} />
                        <div className={styles.locationText}>
                            <p>Select Location</p>
                            <h4>Jaipur, India</h4>
                        </div>
                    </div>
                    
                    <div className={styles.searchContainer}>
                        <CiSearch className={styles.searchIcon} />
                        <input 
                            type="text" 
                            className={styles.search} 
                            placeholder="Search doctors, specialties, conditions, etc."
                        />
                    </div>
                    
                    <button className={styles.loginButton}>
                        <FiUser className={styles.userIcon} />
                        <span>Login </span>
                    </button>
                </div>
            </header>

           
            <nav className={styles.mainNav}>
                <div className={styles.navContainer}>
                    <h2><a href="#" className={styles.navLink}>Buy Medicines</a></h2>
                    <h2> <a href="#" className={styles.navLink}>Find Doctors</a></h2>
                    <h2> <a href="#" className={styles.navLink}>Lab Tests</a></h2>
                    <h2> <a href="#" className={styles.navLink}>Circle Membership</a></h2>
                    <h2><a href="#" className={styles.navLink}>Health Records</a></h2>
                    <h2><a href="#" className={styles.navLink}>Diabetes Reversal</a></h2>
                    <h2><a href="#" className={styles.navLink}>Buy Insurance</a></h2>
                </div>
            </nav>
            <div className={styles.divider}></div>
        </>
    );
}