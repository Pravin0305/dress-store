
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from '../styles/mainLayout.module.css';

function MainLayout() {

  const { pathname } = useLocation();

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Navbar />
      </div>
      <main key={pathname} className={styles.main}>
        <Outlet />
      </main>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
