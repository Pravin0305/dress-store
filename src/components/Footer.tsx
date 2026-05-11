
import { Link } from 'react-router-dom';
import Container from './Container';
import styles from '../styles/footer.module.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container size="xxl">
        <div className={styles.grid}>
          <div>
            <h3 className={styles.brand}>Dress Store</h3>
            <p className={styles.tagline}>
              Curated dresses for every occasion — designed in India, made
              with care.
            </p>
          </div>

          <div>
            <h4 className={styles.colTitle}>Shop</h4>
            <ul className={styles.colList}>
              <li><Link to="/shop">All Dresses</Link></li>
              <li><Link to="/shop/category/casual">Casual</Link></li>
              <li><Link to="/shop/category/evening">Evening</Link></li>
              <li><Link to="/shop/category/bridal">Bridal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>Help</h4>
            <ul className={styles.colList}>
              <li><Link to="/login">Sign in</Link></li>
              <li><Link to="/signup">Create account</Link></li>
              <li><a href="#shipping">Shipping</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#contact">Contact us</a></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>Newsletter</h4>
            <p className={styles.tagline}>
              Get 10% off your first order. New arrivals, sales and stories.
            </p>
            <form
              className={styles.newsletter}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
              />
              <button type="submit">Join</button>
            </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {year} Dress Store. All rights reserved.</span>
          <span>Made in India · Prices in ₹</span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
