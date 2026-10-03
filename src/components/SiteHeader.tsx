"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useScrolled } from "@/hooks/useScrolled";
import { BagIcon, ChevronDownIcon, MenuIcon, SearchIcon, UserIcon } from "./icons";

const NAV_LINKS = [
  { label: "Shop", href: "#", current: true },
  { label: "Category", href: "#", hasMenu: true },
  { label: "About", href: "#" },
  { label: "Support", href: "#" },
];

export default function SiteHeader() {
  const { totalQuantity } = useCart();
  const scrolled = useScrolled();
  const basketLabel = `Basket, ${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`;

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <div className="site-header__bar">
        <nav className="site-header__nav" aria-label="Main">
          <ul className="site-header__nav-list">
            {NAV_LINKS.map(({ label, href, current, hasMenu }) => (
              <li key={label}>
                <a
                  className={`site-header__nav-link${current ? " site-header__nav-link--active" : ""}`}
                  href={href}
                  aria-current={current ? "page" : undefined}
                >
                  {label}
                  {hasMenu && <ChevronDownIcon className="site-header__chevron" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="site-header__logo" href="/" aria-label="Novera home">
          novéra
        </Link>

        <div className="site-header__actions">
          <button type="button" className="site-header__action" aria-label="Search">
            <SearchIcon className="site-header__icon" />
          </button>
          <button type="button" className="site-header__action" aria-label={basketLabel}>
            <BagIcon className="site-header__icon" />
            {totalQuantity > 0 && (
              <span className="site-header__badge" aria-hidden="true">
                {totalQuantity}
              </span>
            )}
          </button>
          <button type="button" className="site-header__action" aria-label="Account">
            <UserIcon className="site-header__icon" />
          </button>
          <button type="button" className="site-header__action" aria-label="Menu">
            <MenuIcon className="site-header__icon" />
          </button>
        </div>
      </div>
    </header>
  );
}
