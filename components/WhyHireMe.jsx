"use client";

import {motion} from "framer-motion";
import {FaCode, FaMobileAlt, FaGraduationCap} from "react-icons/fa";
import {SiSpeedtest} from "react-icons/si";

const skills = [
    {
        icon: <FaCode size={40}/>,
        title: "Clean and Efficient Code",
        description:
            "Writing maintainable, well-documented, and optimized code that follows best practices and design patterns.",
    },
    {
        icon: <SiSpeedtest size={40}/>,
        title: "SEO-Optimized Performance",
        description:
            "Developing high-performance websites with optimal loading speeds and search engine visibility.",
    },
    {
        icon: <FaMobileAlt size={40}/>,
        title: "Responsive Design",
        description:
            "Creating user-friendly interfaces that work flawlessly across all devices and screen sizes.",
    },
    {
        icon: <FaGraduationCap size={40}/>,
        title: "Continuous Learning",
        description:
            "Constantly updating skills and staying current with the latest technologies and development trends.",
    },
];

export default function WhyHireMe() {
    return (
        <section className="w-full py-12 bg-white">
            <div className="container mx-auto px-6">
                {/* Title */}
                <motion.h2
                    className="text-2xl font-bold text-black mb-2 flex items-center gap-2"
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, ease: "easeOut"}}
                >
                    <span className="text-lg">{" >_ "}</span> /why_hire_me?
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    className="text-gray-600 font-mono mb-8"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.3, duration: 0.6}}
                >
                    root@developer:~$ executing_skills_assessment...
                </motion.p>

                {/* Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                    variants={{
                        hidden: {opacity: 0, y: 20},
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {staggerChildren: 0.2},
                        },
                    }}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            className="p-6 border rounded-lg shadow-md bg-white flex flex-col items-start gap-4 hover:shadow-xl transition-all"
                            variants={{
                                hidden: {opacity: 0, y: 20},
                                visible: {opacity: 1, y: 0},
                            }}
                            whileHover={{scale: 1.05, rotate: -1}}
                            transition={{type: "spring", stiffness: 200}}
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-black">{skill.icon}</div>
                                <h3 className="text-lg font-bold">{skill.title}</h3>
                            </div>
                            <p className="text-gray-600 text-sm">{skill.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
