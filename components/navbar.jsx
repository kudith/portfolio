"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ModeToggle } from "./mode-toggle";

export default function Navbar({
  logo = "ADTY",
  logoUrl = "/",
  menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ],
  contactEmail = "hello@adityapratama.dev",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Track active section
  useEffect(() => {
    const sections = menuItems.map((item) => item.href.replace("#", ""));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      // Check if we're at the top of the page
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      const current = sections.find((section, index) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          const nextElement = sections[index + 1]
            ? document.getElementById(sections[index + 1])
            : null;
          const nextElementTop = nextElement
            ? window.scrollY + nextElement.getBoundingClientRect().top
            : document.body.scrollHeight;

          return (
            scrollPosition >= elementTop && scrollPosition < nextElementTop
          );
        }
        return false;
      });

      setActiveSection(current || "home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuItems]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
      >
        <motion.div
          animate={{
            scale: isScrolled ? 0.95 : 1,
            y: isScrolled ? 8 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`
            transition-all duration-300 ease-out rounded-full
            ${
              isScrolled
                ? "backdrop-blur-xl bg-background/60 border border-foreground/[0.08] shadow-xl shadow-foreground/[0.04]"
                : "backdrop-blur-sm bg-background/20 "
            }
          `}
        >
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center gap-8 px-6 py-3">
            {/* Logo */}
            <div className="relative">
              <Link
                href={logoUrl}
                className="block text-lg font-serif font-bold text-foreground transition-colors duration-300"
              >
                {logo}
              </Link>
            </div>

            {/* Desktop Menu with elegant underlines */}
            <div className="flex items-center gap-8">
              {menuItems.map((item, index) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`group relative block px-1 py-2 text-sm font-medium transition-all duration-500 ${
                        isActive
                          ? "text-foreground"
                          : "text-foreground/60 hover:text-foreground/90"
                      }`}
                    >
                      <span className="relative z-10">{item.name}</span>

                      {/* Elegant active underline */}
                      <motion.div
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-foreground/20 via-foreground to-foreground/20 rounded-full"
                        initial={false}
                        animate={{
                          scaleX: isActive ? 1 : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          scaleX: { duration: 0.4 },
                        }}
                        style={{ originX: 0.5 }}
                      />

                      {/* Elegant hover underline */}
                      {!isActive && (
                        <motion.div
                          className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-foreground/50 to-transparent rounded-full"
                          initial={{ scaleX: 0, opacity: 0 }}
                          whileHover={{
                            scaleX: 1,
                            opacity: 1,
                          }}
                          transition={{
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          style={{ originX: 0.5 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mode Toggle */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group ml-4"
              >
                <ModeToggle />
              </motion.div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden w-[90vw] max-w-sm mx-auto">
            <div className="flex items-center justify-between px-6 py-3">
              {/* Logo */}
              <div className="relative flex-shrink-0">
                <Link
                  href={logoUrl}
                  className="block text-lg font-serif font-bold text-foreground transition-colors duration-300"
                >
                  {logo}
                </Link>
              </div>

              {/* Mode Toggle and Hamburger Menu */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center">
                  <ModeToggle />
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMenu}
                  className="relative p-2 text-foreground/70 hover:text-foreground transition-colors duration-300"
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Menu className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/60 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative top-24 mx-4 p-8 rounded-3xl bg-background/90 backdrop-blur-xl border border-foreground/10 shadow-2xl"
            >
              <div className="flex flex-col gap-6">
                {menuItems.map((item, index) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-4 text-2xl font-medium transition-colors duration-300 relative ${
                          isActive
                            ? "text-foreground"
                            : "text-foreground/70 hover:text-foreground"
                        }`}
                      >
                        {/* Small dot indicator for mobile - positioned to the left */}
                        <motion.div
                          className="relative w-1.5 h-1.5 mr-3"
                          initial={false}
                        >
                          <motion.div
                            className="absolute inset-0 rounded-full bg-foreground"
                            animate={{
                              opacity: isActive ? 1 : 0,
                              scale: isActive ? 1 : 0.5,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-full border border-foreground/30"
                            animate={{
                              opacity: isActive ? 0 : 0.3,
                              scale: isActive ? 1.5 : 1,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />
                        </motion.div>

                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: menuItems.length * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="pt-6 border-t border-foreground/10"
                >
                  <Button
                    asChild
                    className="w-full bg-foreground text-background hover:bg-foreground/90 px-6 py-4 text-base font-medium rounded-2xl transition-all duration-300"
                  >
                    <Link
                      href={`mailto:${contactEmail}`}
                      onClick={() => setIsOpen(false)}
                    >
                      Let's cook something epic 🔥
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
