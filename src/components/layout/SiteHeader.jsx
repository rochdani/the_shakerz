import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { business } from '../../data/business';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Our Story', href: '#story' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">S</span>
          <span>{business.name}</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
          <span className="sr-only">Toggle navigation</span>
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="mobile-menu">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="nav-cta" href="#menu" onClick={() => setMenuOpen(false)}>
            Order Now
            <ArrowRight size={16} />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default SiteHeader;
