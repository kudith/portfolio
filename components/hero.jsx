"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

// Social Links dengan animasi konsisten
const MinimalSocialLinks = ({ socialLinks }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 1.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex items-center justify-center gap-6"
    >
      {socialLinks.map((social, index) => (
        <motion.div
          key={social.name}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.8 + index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Link
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-3 text-foreground/30 hover:text-foreground transition-all duration-300 rounded-2xl"
            aria-label={social.label}
          >
            <motion.span
              className="w-5 h-5 block"
              whileHover={{
                scale: 1.2,
                rotate: 5,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {social.icon}
            </motion.span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

// CTA Section dengan animasi yang diperbaiki
const ExperimentalCTA = ({ cvUrl, contactEmail }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col sm:flex-row items-center justify-center gap-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          asChild
          className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-sm font-medium rounded-full transition-all duration-300 border-0 shadow-lg"
        >
          <Link href="#showcase" className="flex items-center gap-3">
            <motion.span
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <ExternalLink className="w-4 h-4" />
            </motion.span>
            <span>View My Work</span>
          </Link>
        </Button>
      </motion.div>

      {cvUrl && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            delay: 1.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Button
            asChild
            variant="ghost"
            className="text-foreground/60 hover:text-foreground hover:bg-transparent p-0 h-auto font-medium text-sm group transition-all duration-300"
          >
            <Link
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 relative group"
            >
              <span>View résumé</span>
              <motion.span
                className="inline-block"
                animate={{ x: 0 }}
                whileHover={{ x: 6 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

// Status Indicator dengan animasi yang diperbaiki
const StatusIndicator = ({ status, location }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 2.0,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col items-center gap-4 text-center"
    >
      {/* Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 2.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex items-center gap-2 text-xs text-foreground/40 font-medium tracking-wider uppercase"
      >
        <motion.div
          className="w-2 h-2 bg-green-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.6 }}
        >
          {status}
        </motion.span>
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 2.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="text-xs text-foreground/30 font-light tracking-widest"
      >
        {location}
      </motion.div>
    </motion.div>
  );
};

// Main Hero Component
export default function HeroSection({
  title = "Fullstack Developer",
  subtitle = "Building cool stuff for the web, one pixel at a time.",
  description = "I turn ideas into digital products that actually work. Currently open for collabs, freelance, or just a coffee chat. Let's make something awesome, no cap.",
  location = "Tasikmalaya, ID",
  status = "Available for projects",
  cvUrl = "/resume.pdf",
  contactEmail = "hello@adityapratama.dev",
  socialLinks = [
    {
      name: "github",
      href: "https://github.com/kudith",
      icon: <Github className="w-full h-full" />,
      label: "GitHub Profile",
    },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/ginanjar-aditiya-prianata-744691242/",
      icon: <Linkedin className="w-full h-full" />,
      label: "LinkedIn Profile",
    },
    {
      name: "portfolio",
      href: "https://portfolio.example.com",
      icon: <ExternalLink className="w-full h-full" />,
      label: "Portfolio Website",
    },
  ],
  className = "",
}) {
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 300], [0, -50]);
  const contentY = useTransform(scrollY, [0, 300], [0, -30]);

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center px-6 lg:px-16 pt-24 ${className}`}
    >
      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center space-y-12">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-foreground/50 text-sm font-light tracking-widest uppercase"
          >
            hello, i'm
          </motion.div>

          {/* Main Title dengan animasi yang diperbaiki */}
          <motion.div style={{ y: titleY }} className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hero-title text-7xl md:text-8xl lg:text-9xl text-foreground tracking-tighter cursor-default"
              whileHover="hover"
            >
              <motion.span
                className="block"
                variants={{
                  initial: { scale: 1, textShadow: "0 0 0px rgba(0,0,0,0)" },
                  hover: {
                    scale: 1.03,
                    textShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                initial="initial"
              >
                {title}
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="space-y-2"
            >
              <p className="text-base md:text-lg text-foreground/40 font-light pt-0 lg:pt-6">
                {subtitle}
              </p>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-2xl mx-auto"
          >
            <p className="hero-description text-lg md:text-xl text-foreground/50 leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* CTA Section */}
          <ExperimentalCTA cvUrl={cvUrl} contactEmail={contactEmail} />

          {/* Social Links */}
          <MinimalSocialLinks socialLinks={socialLinks} />

          {/* Status */}
          <StatusIndicator status={status} location={location} />
        </div>
      </div>
    </section>
  );
}
