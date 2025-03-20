"use client";

import { motion } from "framer-motion";
import { FaLinux, FaReact, FaPython, FaJs, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

const skills = [
  { icon: <FaLinux size={82} />, label: "Advanced" },
  { icon: <FaNodeJs size={82} />, label: "Advanced" },
  { icon: <FaReact size={82} />, label: "Advanced" },
  { icon: <FaJs size={82} />, label: "Advanced" },
  { icon: <SiTailwindcss size={82} />, label: "Advanced" },
  { icon: <FaPython size={82} />, label: "Beginner" },
];

export default function Skills() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          className="text-2xl font-bold  mb-6 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-lg">{" >_ "}</span> /skills
        </motion.h2>

        {/* Icons Container */}
        <motion.div
          className="flex flex-wrap justify-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.1, rotate: -2 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="p-6 rounded-lg text-zinc-950 shadow-lg">
                {skill.icon}
              <p className="mt-2 text-sm text-gray-700">{skill.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
