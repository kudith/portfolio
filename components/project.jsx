"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
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
      id="showcase"
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <SpotlightCard className="h-full backdrop-blur-[2px] bg-background/40 border-foreground/10">
        <div className="flex flex-col gap-6">
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

          <div className="flex gap-3 pt-2">
            <Link
              href={project.live}
              className="group inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live</span>
            </Link>
            <span className="text-foreground/20">/</span>
            <Link
              href={project.repo}
              className="group inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </Link>
          </div>
        </div>
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
        <div className="lg:block">
          <CardSwap width={520} height={380} pauseOnHover delay={4800}>
            {topProjects.map((p) => (
              <Card key={p.title} className="rounded-2xl overflow-hidden">
                <div className="w-full h-full p-6 bg-card bg-[radial-gradient(1200px_400px_at_0%_0%,rgba(0,0,0,0.06),transparent_60%)] dark:bg-[radial-gradient(1200px_400px_at_0%_0%,rgba(255,255,255,0.08),transparent_60%)] flex flex-col justify-between">
                  <div className="text-muted-foreground text-sm">
                    {Array.isArray(p.tags) ? p.tags.join(" • ") : ""}
                  </div>
                  <div className="text-card-foreground text-lg font-serif">
                    {p.title}
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      )}
    </div>
  );
};

export default function ProjectSection() {
  const visibleProjects = projects.slice(0, 4);
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
          <AnimatePresence initial={false} mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {visibleProjects.map((p, idx) => (
                <ProjectCard key={p.title} project={p} delay={idx * 0.05} />
              ))}
            </div>
          </AnimatePresence>
        </motion.div>

        {/* Removed "See more" toggle to always show only the top 4 */}
      </div>
    </section>
  );
}
