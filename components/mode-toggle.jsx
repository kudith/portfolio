"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-transparent border border-foreground/10" />
    );
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setIsChanging(true);
    setTheme(isDark ? "light" : "dark");

    // Reset changing state after animation
    setTimeout(() => setIsChanging(false), 800);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm border border-foreground/10 hover:border-foreground/20 transition-all duration-500 overflow-hidden group"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
      transition={{
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
      }}
      disabled={isChanging}
    >
      {/* Enhanced background gradient with smooth transition */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-foreground/5 to-foreground/10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isChanging ? 0.8 : 0,
          scale: isChanging ? 1.1 : 1,
        }}
        whileHover={{ opacity: 0.4 }}
        transition={{
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1],
        }}
      />

      {/* Theme transition pulse effect */}
      <AnimatePresence>
        {isChanging && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{
              scale: [0, 1.5, 2],
              opacity: [0.8, 0.4, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1],
              times: [0, 0.6, 1],
            }}
            className="absolute inset-0 rounded-full bg-foreground/20"
          />
        )}
      </AnimatePresence>

      {/* Icon container with enhanced animations */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{
                scale: 0.3,
                opacity: 0,
                rotate: -180,
                y: 20,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
                y: 0,
              }}
              exit={{
                scale: 0.3,
                opacity: 0,
                rotate: 180,
                y: -20,
              }}
              transition={{
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1],
                opacity: { duration: 0.4 },
                scale: {
                  duration: 0.6,
                  ease: [0.175, 0.885, 0.32, 1.275],
                },
              }}
              className="relative"
            >
              <Moon className="w-4 h-4 text-foreground/70 group-hover:text-foreground transition-colors duration-500" />

              {/* Enhanced glow effect for moon */}
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400/20 blur-md"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: isChanging ? 0 : 0,
                  scale: isChanging ? 1.5 : 0.5,
                }}
                whileHover={{
                  opacity: 0.6,
                  scale: 1.3,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.23, 1, 0.32, 1],
                }}
              />

              {/* Subtle rotation animation for moon */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: isChanging ? 360 : 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <Moon className="w-4 h-4 opacity-20" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{
                scale: 0.3,
                opacity: 0,
                rotate: -180,
                y: 20,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
                y: 0,
              }}
              exit={{
                scale: 0.3,
                opacity: 0,
                rotate: 180,
                y: -20,
              }}
              transition={{
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1],
                opacity: { duration: 0.4 },
                scale: {
                  duration: 0.6,
                  ease: [0.175, 0.885, 0.32, 1.275],
                },
              }}
              className="relative"
            >
              <Sun className="w-4 h-4 text-foreground/70 group-hover:text-foreground transition-colors duration-500" />

              {/* Enhanced glow effect for sun */}
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-400/20 blur-md"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: isChanging ? 0 : 0,
                  scale: isChanging ? 1.5 : 0.5,
                }}
                whileHover={{
                  opacity: 0.6,
                  scale: 1.3,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.23, 1, 0.32, 1],
                }}
              />

              {/* Continuous subtle rotation for sun rays */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: isChanging ? 180 : 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <Sun className="w-4 h-4 opacity-20" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-full bg-foreground/10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{
          scale: [0, 1.2, 1.5],
          opacity: [0.3, 0.1, 0],
        }}
        transition={{
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1],
          times: [0, 0.6, 1],
        }}
      />

      {/* Accessibility */}
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </motion.button>
  );
}
