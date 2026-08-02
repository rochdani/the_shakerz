import './App.css';
import { flavours } from './data/flavours';
import FlavourHero from './components/hero/FlavourHero';
import SiteHeader from './components/layout/SiteHeader';
import ProductSection from './components/products/ProductSection';
import StorySection from './components/story/StorySection';
import ReviewSection from './components/reviews/ReviewSection';
import FaqSection from './components/faq/FaqSection';
import LocationSection from './components/layout/LocationSection';
import SiteFooter from './components/layout/SiteFooter';

function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <FlavourHero flavours={flavours} />
        <ProductSection />
        <StorySection />
        <ReviewSection />
        <FaqSection />
        <LocationSection />
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
