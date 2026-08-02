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
        <button type="button" className="product-order-button">
          Buy now
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
