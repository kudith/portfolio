"use client"

import {useState, useEffect, useRef} from "react"
import {motion, useAnimation} from "framer-motion"
import {Terminal} from "@/components/ui/Terminal"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Card, CardContent} from "@/components/ui/card"

export default function WhoAmI() {
    const [lines, setLines] = useState([])
    const [isComplete, setIsComplete] = useState(false)
    const controls = useAnimation()
    const ref = useRef(null)

    useEffect(() => {
        const terminalLines = [
            '<span style="color: #ff5f56;">$ whoami</span>',
            '<span style="color: #ff5f56;">Ginanjar Aditya Priamata</span>',
            "",
            '<span style="color: #ffbd2e;">$ contact.info</span>',
            '<span style="color: #ffbd2e;">["ginanjar.aditya10@gmail.com", "LinkedIn", "GitHub"]</span>',
            "",
            '<span style="color: #27c93f;">$ skills</span>',
            '<span style="color: #27c93f;">["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Linux"]</span>',
        ]

        let currentLineIndex = 0
        const interval = setInterval(() => {
            if (currentLineIndex < terminalLines.length) {
                setLines((prev) => [...prev, terminalLines[currentLineIndex]])
                currentLineIndex++
            } else {
                clearInterval(interval)
                setIsComplete(true)
            }
        }, 150)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start("visible")
                }
            },
            {threshold: 0.4}
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [controls])

    // Animation variants
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.4,
            },
        },
    }

    const itemVariants = {
        hidden: {y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
            transition: {type: "spring", stiffness: 100},
        },
    }

    return (
        <section className="w-full py-12 md:py-24" ref={ref}>
            <div className="container px-4 md:px-6">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                >
                    {/* Left Column - Profile */}
                    <motion.div
                        className="flex flex-col items-center md:items-center text-center md:text-left"
                        variants={itemVariants}
                    >
                        <motion.div
                            initial={{scale: 0.8, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                delay: 0.2,
                            }}
                        >
                            <Avatar className="w-40 h-40 border-4">
                                <AvatarImage src="/assets/icons/me.png"
                                             alt="Ginanjar Aditya Priamata"/>
                                <AvatarFallback
                                    className=" text-zinc-400 text-xl">GAP</AvatarFallback>
                            </Avatar>
                        </motion.div>

                        <motion.h2
                            className="mt-6 text-2xl text-center font-bold text-zinc-950 dark:text-white"
                            variants={itemVariants}
                        >
                            Ginanjar Aditya Prianata
                        </motion.h2>

                        <motion.p
                            className="mt-4 text-zinc-500 dark:text-zinc-400 text-center max-w-md"
                            variants={itemVariants}
                        >
                            A web developer who builds fast and modern websites
                            with JavaScript and Next.js. I also love working
                            with
                            Linux for a smooth development experience.
                        </motion.p>
                    </motion.div>

                    {/* Right Column - Terminal */}
                    <motion.div variants={itemVariants}>
                        <Card
                            className="bg-black dark:bg-amber-50 border-zinc-800 py-0 overflow-hidden">
                            <div
                                className="bg-zinc-900 px-4 py-2 flex items-center gap-1.5">
                                <div
                                    className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div
                                    className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div
                                    className="w-3 h-3 rounded-full bg-green-500"></div>
                                <div
                                    className="flex-1 text-center text-xs text-zinc-400 font-mono">about@me
                                </div>
                            </div>
                            <CardContent className="p-0">
                                <Terminal
                                    className="min-h-[300px] bg-black dark:bg-amber-50 rounded-none border-0">
                                    {lines.map((line, index) => (
                                        <div
                                            key={index}
                                            className="font-mono text-sm"
                                            dangerouslySetInnerHTML={{__html: line || "&nbsp;"}}
                                        />
                                    ))}
                                    {isComplete && (
                                        <motion.div
                                            className="font-mono text-sm text-green-400 mt-2"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{delay: 0.5}}
                                        >
                                            $ <span
                                            className="animate-pulse">_</span>
                                        </motion.div>
                                    )}
                                </Terminal>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}