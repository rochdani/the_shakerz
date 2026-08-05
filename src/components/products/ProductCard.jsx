import { ArrowRight } from 'lucide-react';

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <span>{product.flavour}</span>
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card-body">
        <div className="product-card-topline">
          <span className="product-price">{product.price}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <a href="#contact" className="product-order-button">
          Order now
          <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}

export default ProductCard;
