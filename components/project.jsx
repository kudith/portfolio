"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github, Lock, EyeOff } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import CardSwap, { Card } from "@/components/CardSwap/CardSwap";
// import { Button } from "@/components/ui/button";
import projectsData from "@/data/projects.json";

const projects = projectsData;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true, margin: "-80px" },
});

const Tag = ({ children }) => (
  <span className="px-2.5 py-1 rounded-full text-xs tracking-wide bg-foreground/5 text-foreground/60 border border-foreground/10">
    {children}
  </span>
);

const ProjectCard = ({ project, delay = 0 }) => {
  return (
    <motion.div
      className="h-full"
      id="showcase"
      layout
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
        layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      <SpotlightCard className="h-full backdrop-blur-[2px] bg-background/40 border-foreground/10 transition-all duration-500 hover:bg-background/60 hover:border-foreground/20">
        <motion.div
          className="h-full flex flex-col gap-6"
          whileHover={{
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div className="space-y-2">
            <h4 className="text-2xl font-serif tracking-tight text-foreground">
              {project.title}
            </h4>
            <p className="text-sm text-foreground/60 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-auto flex gap-3 pt-2">
            {project.live && project.live !== "#" ? (
              <Link
                href={project.live}
                rel="noopener noreferrer"
                target="_blank"
                className="group inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live</span>
              </Link>
            ) : (
              <div className="inline-flex items-center gap-2 text-sm text-foreground/40">
                <EyeOff className="w-4 h-4" />
                <span>Private</span>
              </div>
            )}

            {project.live &&
              project.live !== "#" &&
              project.repo &&
              project.repo !== "#" && (
                <span className="text-foreground/20">/</span>
              )}

            {project.repo && project.repo !== "#" ? (
              <Link
                href={project.repo}
                className="group inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </Link>
            ) : (
              <div className="inline-flex items-center gap-2 text-sm text-foreground/40">
                <Lock className="w-4 h-4" />
                <span>Private</span>
              </div>
            )}
          </div>
        </motion.div>
      </SpotlightCard>
    </motion.div>
  );
};

const FeaturedShowcase = () => {
  const [showSwap, setShowSwap] = useState(false);
  const topProjects = projects.slice(0, 4);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const update = () => setShowSwap(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <div className="relative h-[420px] w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        className="absolute inset-0 rounded-3xl border border-foreground/10 bg-gradient-to-br from-foreground/[0.03] via-transparent to-transparent"
      />

      {/* Left text content next to the CardSwap stack */}
      <motion.div
        {...fadeUp(0.05)}
        className="relative z-10 h-full flex items-center pl-6 pr-6 md:pl-10"
      >
        <div className="max-w-xl space-y-5">
          <div className="space-y-2">
            <span className="text-xs tracking-[0.2em] uppercase text-foreground/40">
              Showcase
            </span>
            <h4 className="text-3xl md:text-4xl font-serif tracking-tight text-foreground">
              Design that feels as good as it looks
            </h4>
          </div>
          <p className="text-foreground/60 leading-relaxed">
            A selection of interface explorations and product work. The focus is
            on tactility, rhythm, and clarity—prioritizing readable layouts and
            motion that serves the experience.
          </p>
          <div className="flex gap-3 text-sm text-foreground/70">
            <Link
              href="#work"
              className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Explore details</span>
            </Link>
            <span className="text-foreground/20">/</span>
            <Link
              href="#"
              className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>See source</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {showSwap && (
        <motion.div
          className="lg:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <CardSwap width={520} height={380} pauseOnHover delay={4800}>
            {topProjects.map((p, idx) => (
              <Card key={p.title} className="rounded-2xl overflow-hidden">
                <motion.div
                  className="w-full h-full p-6 bg-card bg-[radial-gradient(1200px_400px_at_0%_0%,rgba(0,0,0,0.06),transparent_60%)] dark:bg-[radial-gradient(1200px_400px_at_0%_0%,rgba(255,255,255,0.08),transparent_60%)] flex flex-col justify-between"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  }}
                >
                  <div className="text-muted-foreground text-sm">
                    {Array.isArray(p.tags) ? p.tags.join(" • ") : ""}
                  </div>
                  <div className="text-card-foreground text-lg font-serif">
                    {p.title}
                  </div>
                </motion.div>
              </Card>
            ))}
          </CardSwap>
        </motion.div>
      )}
    </div>
  );
};

export default function ProjectSection() {
  const [showAll, setShowAll] = useState(false);
  const initialProjects = projects.slice(0, 4);
  const visibleProjects = showAll ? projects : initialProjects;
  const hasMoreProjects = projects.length > 4;

  return (
    <section id="work" className="relative px-6 lg:px-16 py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp(0)} className="text-center space-y-5">
          <h3 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-foreground">
            Selected Projects
          </h3>
          <p className="text-foreground/60 max-w-2xl mx-auto text-base md:text-lg">
            Purposeful work that balances aesthetics and usability—crafted with
            intention and refined with care.
          </p>
        </motion.div>

        <div className="mt-14">
          <FeaturedShowcase />
        </div>

        <motion.div layout className="mt-16">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-stretch"
            layout
            transition={{
              layout: { type: "spring", stiffness: 320, damping: 34 },
            }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {visibleProjects.map((p, idx) => (
                <motion.div
                  key={p.title}
                  layout
                  className="h-full"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                    layout: { type: "spring", stiffness: 320, damping: 34 },
                  }}
                >
                  <ProjectCard project={p} delay={0} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {hasMoreProjects && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              layout: { type: "spring", stiffness: 320, damping: 34 },
            }}
            className="mt-12 text-center"
          >
            <motion.button
              layout
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm text-foreground/70 hover:text-foreground transition-all duration-300 border border-foreground/10 hover:border-foreground/20 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70"
              whileHover={{
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
              }}
            >
              <motion.span
                key={showAll ? "less" : "more"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {showAll
                  ? "Show Less"
                  : `See ${projects.length - 4} More Projects`}
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
