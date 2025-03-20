"use client";
import {motion} from "framer-motion";
import Typical from "react-typical";
import {PiLinuxLogoFill} from "react-icons/pi";

export default function Hero() {
    return (
        <section
            className="flex flex-col items-center justify-center h-screen text-center">
            {/* Nama dengan animasi fade-in dan slide-up */}
            <motion.h1
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, ease: "easeOut"}}
                className="text-4xl font-bold"
            >
                <span>Hi!, I am</span>
                <br/>
                <span className="relative inline-block">
                                        Ginanjar Aditya Prianata
                                        <motion.span
                                            initial={{width: 0}}
                                            animate={{width: "100%"}}
                                            transition={{
                                                duration: 1,
                                                ease: "easeInOut",
                                                delay: 0.8
                                            }}
                                            className="absolute left-0 bottom-0 h-[2px] bg-black"
                                        />
                                    </span>
            </motion.h1>

            {/* Animasi Typing */}
            <motion.h2
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, ease: "easeOut", delay: 0.5}}
                className="text-lg text-gray-600 mt-4"
            >
                <Typical steps={["Full-Stack Web Developer", 1500]}
                         loop={Infinity}/>
            </motion.h2>

            {/* Logo Linux dengan efek bounce */}
            <motion.div
                initial={{scale: 0}}
                animate={{scale: 1}}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                    delay: 1
                }}
                className="mt-6"
            >
                <PiLinuxLogoFill className="w-30 h-30"/>
            </motion.div>
        </section>
    );
}