"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useVelocity,
  useSpring,
  useAnimationFrame,
} from "framer-motion";
import { useRef, useLayoutEffect, useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiAmazon,
  SiDocker,
  SiGit,
  SiFigma,
  SiTailwindcss,
} from "react-icons/si";
import { Code2, Heart, Lightbulb, Coffee } from "lucide-react";

// Technology data with real logos
const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "AWS", icon: SiAmazon, color: "#FF9900" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
];

const principles = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing readable, maintainable code that scales",
  },
  {
    icon: Heart,
    title: "User-First",
    description: "Designing with empathy and accessibility in mind",
  },
  {
    icon: Lightbulb,
    title: "Always Learning",
    description: "Staying curious and adapting to new technologies",
  },
];

// Hero info section dengan enhanced animations
const InfoSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-center space-y-8 max-w-4xl mx-auto"
    >
      {/* Name dengan beautiful typography */}
      <div className="space-y-4">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-serif font-light text-foreground tracking-tight"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true }}
          >
            Ginanjar
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true }}
          >
            Aditya Prianata
          </motion.span>
        </motion.h3>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto origin-center"
        />
      </div>

      {/* Bio dengan enhanced typography */}
      <div className="space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-serif-body text-foreground/80 leading-relaxed max-w-3xl mx-auto font-light"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
            }}
            viewport={{ once: true }}
          >
            Passionate fullstack developer who loves creating digital
            experiences that make a real difference.
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
            }}
            viewport={{ once: true }}
          >
            I believe in the power of clean code, thoughtful design, and solving
            complex problems with simple solutions.
          </motion.span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 text-foreground/50"
        >
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Coffee className="w-5 h-5" />
          </motion.div>
          <span className="text-lg font-light tracking-wide">
            Fueled by coffee and curiosity
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Custom Velocity Text Component untuk technology stack
const VelocityTechRow = ({ techList, velocity = 100, className = "" }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 30,
    stiffness: 200,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false,
  });

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.scrollWidth / 3);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [techList]);

  function wrap(min, max, v) {
    const range = max - min;
    return min + ((((v - min) % range) + range) % range);
  }

  const x = useTransform(baseX, (v) => {
    if (containerWidth === 0) return "0px";
    return `${wrap(-containerWidth, 0, v)}px`;
  });

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * velocity * (delta / 1000);

    const scrollEffect = velocityFactor.get();
    if (scrollEffect < 0) {
      directionFactor.current = -1;
    } else if (scrollEffect > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * scrollEffect * 0.3;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="relative overflow-hidden py-3 md:py-4">
      <motion.div
        ref={containerRef}
        className="flex whitespace-nowrap"
        style={{ x }}
      >
        {techList.map((tech, index) => {
          const IconComponent = tech.icon;
          return (
            <motion.div
              key={`${tech.name}-1-${index}`}
              className="flex items-center gap-3 md:gap-4 mx-6 md:mx-10 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <IconComponent
                className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12"
                style={{ color: tech.color }}
              />
              <span className="text-lg md:text-xl lg:text-2xl font-medium text-foreground/80 whitespace-nowrap">
                {tech.name}
              </span>
            </motion.div>
          );
        })}
        {techList.map((tech, index) => {
          const IconComponent = tech.icon;
          return (
            <motion.div
              key={`${tech.name}-2-${index}`}
              className="flex items-center gap-3 md:gap-4 mx-6 md:mx-10 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <IconComponent
                className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12"
                style={{ color: tech.color }}
              />
              <span className="text-lg md:text-xl lg:text-2xl font-medium text-foreground/80 whitespace-nowrap">
                {tech.name}
              </span>
            </motion.div>
          );
        })}
        {techList.map((tech, index) => {
          const IconComponent = tech.icon;
          return (
            <motion.div
              key={`${tech.name}-3-${index}`}
              className="flex items-center gap-3 md:gap-4 mx-6 md:mx-10 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <IconComponent
                className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12"
                style={{ color: tech.color }}
              />
              <span className="text-lg md:text-xl lg:text-2xl font-medium text-foreground/80 whitespace-nowrap">
                {tech.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

// Tech stack dengan scroll velocity
const TechStack = () => {
  const firstRowTech = technologies.slice(0, 6);
  const secondRowTech = technologies.slice(6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="space-y-8"
    >
      <div className="text-center space-y-3">
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true }}
          className="text-4xl font-serif font-light text-foreground"
        >
          Tech Stack
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true }}
          className="text-foreground/60 text-lg font-light max-w-md mx-auto"
        >
          Technologies I love working with
        </motion.p>
      </div>

      <div className="space-y-4">
        <VelocityTechRow techList={firstRowTech} velocity={80} />
        <VelocityTechRow techList={secondRowTech} velocity={-80} />
      </div>
    </motion.div>
  );
};

// Updated Principles section dengan aesthetic card-based layout
const Principles = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="space-y-12 max-w-5xl mx-auto"
    >
      <div className="text-center space-y-4">
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true }}
          className="text-4xl font-serif font-light text-foreground"
        >
          What Drives Me
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true }}
          className="text-foreground/60 text-lg font-light max-w-md mx-auto"
        >
          Core principles that shape my approach to development
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {principles.map((principle, index) => (
          <motion.div
            key={principle.title}
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3 + index * 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 },
            }}
            className="relative bg-background/90 backdrop-blur-md rounded-2xl p-6 border border-foreground/10 shadow-lg"
            style={{
              transform: `translateY(${index * 20}px)`,
              zIndex: principles.length - index,
            }}
          >
            {/* Icon dengan subtle gradient background */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.5 + index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true }}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-foreground/10 to-foreground/5 flex items-center justify-center mb-4 mx-auto"
            >
              <principle.icon className="w-8 h-8 text-foreground/80" />
            </motion.div>

            {/* Title dan Description */}
            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.7 + index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true }}
              className="text-xl font-serif font-semibold text-foreground text-center mb-2"
            >
              {principle.title}
            </motion.h4>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.9 + index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true }}
              className="text-base text-foreground/70 leading-relaxed font-light text-center"
            >
              {principle.description}
            </motion.p>

            {/* Decorative element */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 1.1 + index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-32 px-4 md:px-8 lg:px-12 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground tracking-tight mb-6"
          >
            <motion.span
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true }}
              className="inline-block"
            >
              Who Am I ?
            </motion.span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true }}
            className="w-20 h-[3px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto rounded-full origin-center"
          />
        </motion.div>

        <div className="space-y-32">
          <InfoSection />
          <TechStack />
          <Principles />
        </div>
      </div>
    </section>
  );
}
