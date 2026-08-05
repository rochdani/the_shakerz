import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from './ProductCard';
import { createStaggerVariants, useReducedMotion } from '../../animations/reveal';
import SectionWave from '../shared/SectionWave';

function ProductSection() {
  const railRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const variants = createStaggerVariants({ stagger: 0.1, y: 16, reducedMotion });

  const scrollProducts = (direction) => {
    if (!railRef.current) return;

    railRef.current.scrollBy({
      left: direction * Math.min(railRef.current.clientWidth * 0.8, 720),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section className="section section-band section-band-secondary product-section-redesign" id="menu">
      <div className="section__content">
        <div className="products-showcase">
        <div className="products-heading">
          <div>
            <p className="eyebrow">Explore the menu</p>
            <h2>Find your flavour.</h2>
          </div>
          <p>Creamy, dreamy and made just for you.</p>
        </div>

        <div className="products-rail-wrap">
          <button
            type="button"
            className="products-arrow products-arrow-left"
            onClick={() => scrollProducts(-1)}
            aria-label="Scroll to previous products"
          >
            <ChevronLeft size={20} />
          </button>
          <motion.div
            ref={railRef}
            className="products-grid"
            variants={variants.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {products.map((product) => (
              <motion.div className="product-slide" key={product.id} variants={variants.item}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          <button
            type="button"
            className="products-arrow products-arrow-right"
            onClick={() => scrollProducts(1)}
            aria-label="Scroll to next products"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="carousel-dots" aria-hidden="true">
          {products.map((product, index) => <i className={index === 0 ? 'active' : ''} key={product.id} />)}
        </div>
        </div>
      </div>
      <SectionWave position="bottom" fill="var(--shakerz-primary-cream)" variant="asymmetric" />
    </section>
  );
}

export default ProductSection;
