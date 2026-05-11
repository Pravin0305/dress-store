
import Container from '../components/Container';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import CategoryCard from '../components/CategoryCard';
import ProductGrid from '../components/ProductGrid';
import LazyImage from '../components/LazyImage';
import {
  getCategories,
  getFeaturedProducts,
  getNewArrivals,
} from '../data';
import styles from '../styles/homePage.module.css';

function HomePage() {
  const categories = getCategories();
  const featured = getFeaturedProducts(8);
  const newArrivals = getNewArrivals(4);

  return (
    <Container size="xxl">
      <div className={styles.page}>
        {}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>New season · 2026</p>
            <h1>Dresses for every chapter.</h1>
            <p>
              From easy weekdays to once-in-a-lifetime moments — a curated
              collection of dresses, crafted for women in India.
            </p>
            <div className={styles.heroCtas}>
              <Button to="/shop" size="lg">Shop the collection</Button>
              <Button to="/shop/category/bridal" size="lg" variant="secondary">
                Bridal & Occasion
              </Button>
            </div>
          </div>
          <div className={styles.heroImage}>
            <LazyImage
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80"
              alt="Model wearing a flowing dress"
              loading="eager"
            />
          </div>
        </section>

        {}
        <section>
          <SectionHeader
            eyebrow="Shop by"
            title="Categories"
            subtitle="Find a piece for every moment — casual to bridal."
            ctaLabel="View all"
            ctaTo="/shop"
          />
          <div className={styles.categoryGrid}>
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </section>

        {}
        <section>
          <SectionHeader
            eyebrow="Loved by everyone"
            title="Featured Dresses"
            subtitle="Best-sellers and new favourites this season."
            ctaLabel="Shop all"
            ctaTo="/shop"
          />
          <ProductGrid products={featured} />
        </section>

        {}
        <section>
          <SectionHeader
            eyebrow="Just in"
            title="New Arrivals"
            subtitle="Fresh drops, only just landed."
            ctaLabel="See more"
            ctaTo="/shop"
          />
          <ProductGrid products={newArrivals} />
        </section>
      </div>
    </Container>
  );
}

export default HomePage;
