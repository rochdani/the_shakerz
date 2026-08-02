import { useReveal } from '../../animations/reveal';

function IngredientsSection() {
  const revealRef = useReveal();

  return (
    <section className="section ingredients-section" ref={revealRef}>
      <div className="ingredients-shell">
        <div className="ingredient-orb">
          <img src="/assets/ingredients/chocolate-piece.png" alt="" loading="lazy" />
          <img src="/assets/ingredients/strawberry.png" alt="" loading="lazy" />
          <img src="/assets/ingredients/mango-piece.png" alt="" loading="lazy" />
          <img src="/assets/ingredients/oreo-cookie.png" alt="" loading="lazy" />
          <img src="/assets/ingredients/mint-leaf.png" alt="" loading="lazy" />
          <img src="/assets/ingredients/ice-cube.png" alt="" loading="lazy" />
        </div>
        <div className="ingredients-copy">
          <p className="eyebrow">Quality ingredients</p>
          <h2>Freshly sourced, prepared to order and finished with flair.</h2>
          <ul>
            <li>Fresh ingredients</li>
            <li>Prepared to order</li>
            <li>Custom toppings</li>
            <li>Multiple flavour choices</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default IngredientsSection;
