import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Bars2Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[666] w-full backdrop-blur ${
          isScrolled ? "scrolled" : ""
        }`}
      >
        <nav className="container flex h-20 items-center justify-between transition-all ease-out">
          <div className="flex items-center gap-20">
            <div>
              <Link href={"/"} className="block">
                <h1 className="text-2xl font-thin">
                  Sableng<span className="font-bold text-primary">Movie</span>
                </h1>
              </Link>
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center gap-20">
                <li>
                  <Link
                    href={"/"}
                    className="transition-colors ease-out hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <button className="transition-colors ease-out hover:text-primary">
                    Kategori
                  </button>
                </li>
                <li>
                  <Link
                    href={"/about"}
                    className="transition-colors ease-out hover:text-primary"
                  >
                    Tentang
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button className="inline-block h-5 w-5">
              <MagnifyingGlassIcon className="text-zinc-300" />
            </button>
            <button
              onClick={handleMenuClick}
              className={`nav-btn ml-4 block md:hidden ${
                menuOpen ? "active" : ""
              }`}
            >
              <Bars2Icon />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`mobile-nav ${menuOpen ? "active" : ""}`}
        onClick={handleLinkClick}
      >
        <ul className="space-y-10">
          <li>
            <Link
              href={"/"}
              className="text-xl transition-colors ease-out hover:text-primary"
            >
              Home
            </Link>
          </li>
          <li>
            <button className="text-xl transition-colors ease-out hover:text-primary">
              Kategori
            </button>
          </li>
          <li>
            <Link
              href={"/about"}
              className="text-xl transition-colors ease-out hover:text-primary"
            >
              Tentang
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
