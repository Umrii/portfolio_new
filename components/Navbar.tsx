"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useScrollSpy } from "@/lib/useScrollSpy";

const NAV_LINKS = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "contact", label: "CONTACT" },
] as const;

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const savedScrollY = useRef(0);
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll lock that preserves position: body { overflow: hidden } resets
  // window.scrollY to 0, so pin the body at -scrollY instead. Lock/unlock
  // run synchronously in the handlers so the default anchor navigation of
  // overlay links still works against an unlocked document.
  const openMenu = () => {
    savedScrollY.current = window.scrollY;
    const { style } = document.body;
    style.position = "fixed";
    style.top = `-${savedScrollY.current}px`;
    style.left = "0";
    style.right = "0";
    setMenuOpen(true);
  };

  const closeMenu = () => {
    const { style } = document.body;
    style.position = "";
    style.top = "";
    style.left = "";
    style.right = "";
    window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || menuOpen
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between">
        <a
          href="#home"
          onClick={() => {
            if (menuOpen) closeMenu();
          }}
          className="font-mono text-base font-bold tracking-tight text-text-primary"
        >
          anas atiq<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link, index) => (
            <Fragment key={link.id}>
              {index > 0 && (
                <span className="select-none text-text-faint">·</span>
              )}
              <a
                href={`#${link.id}`}
                className={`relative font-mono text-xs tracking-[0.15em] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-accent after:transition-transform after:duration-300 ${
                  activeId === link.id
                    ? "text-text-primary after:scale-x-100"
                    : "text-text-muted after:scale-x-0 hover:text-text-primary"
                }`}
              >
                {link.label}
              </a>
            </Fragment>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => (menuOpen ? closeMenu() : openMenu())}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 block h-px w-full bg-text-primary transition-transform duration-300 ${
                menuOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6.5px] block h-px w-full bg-text-primary transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 block h-px w-full bg-text-primary transition-transform duration-300 ${
                menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 -z-10 h-screen bg-background/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          className="flex h-full flex-col items-center justify-center gap-8"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={closeMenu}
              className={`font-mono text-2xl tracking-[0.2em] transition-colors ${
                activeId === link.id
                  ? "text-accent"
                  : "text-text-primary hover:text-accent"
              }`}
            >
              <span className="mr-3 align-middle font-mono text-xs text-text-faint">
                0{index + 1}
              </span>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
