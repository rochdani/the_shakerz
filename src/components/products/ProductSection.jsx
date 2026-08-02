import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from './ProductCard';
import { createStaggerVariants, useReducedMotion } from '../../animations/reveal';

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
    <section className="section section-cream" id="menu">
      <div className="products-showcase">
        <div className="products-heading">
          <div>
            <p className="eyebrow">Explore the menu</p>
            <h2>Discover your<br />delicious taste.</h2>
          </div>
          <p>
            From creamy classics to bright fruit blends, swipe through and find the shake made for you.
          </p>
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
      </div>
    </section>
  );
}

export default ProductSection;
