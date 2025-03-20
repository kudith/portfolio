"use client";
import {motion} from "framer-motion";
import {useEffect, useState, useCallback} from "react";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
    Github,
    ExternalLink,
    Terminal,
    Folder,
    Code2,
    ChevronDown,
    Loader2
} from "lucide-react";

const ALL_PROJECTS = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with real-time inventory management",
        image: "/placeholder.svg?height=400&width=600",
        tech: ["Next.js", "TypeScript", "Prisma"],
        github: "https://github.com/yourusername/project1",
        demo: "https://demo1.example.com",
    },
    {
        id: 2,
        title: "AI Chat Application",
        description: "Real-time chat application with AI-powered responses",
        image: "/placeholder.svg?height=400&width=600",
        tech: ["React", "Python", "WebSocket"],
        github: "https://github.com/yourusername/project2",
        demo: "https://demo2.example.com",
    },
    {
        id: 3,
        title: "Task Management System",
        description: "Collaborative task management with real-time updates",
        image: "/placeholder.svg?height=400&width=600",
        tech: ["Vue.js", "Node.js", "MongoDB"],
        github: "https://github.com/yourusername/project3",
        demo: "https://demo3.example.com",
    },
    {
        id: 4,
        title: "Blog Platform",
        description: "Modern blogging platform with markdown support",
        image: "/placeholder.svg?height=400&width=600",
        tech: ["Next.js", "MDX", "Tailwind"],
        github: "https://github.com/yourusername/project4",
        demo: "https://demo4.example.com",
    },
    {
        id: 5,
        title: "Weather Dashboard",
        description: "Real-time weather monitoring with interactive maps",
        image: "/placeholder.svg?height=400&width=600",
        tech: ["React", "D3.js", "OpenWeather API"],
        github: "https://github.com/yourusername/project5",
        demo: "https://demo5.example.com",
    },
    {
        id: 6,
        title: "Social Media Analytics",
        description: "Analytics dashboard for social media metrics",
        image: "/placeholder.svg?height=400&width=600",
        tech: ["Vue.js", "Chart.js", "Firebase"],
        github: "https://github.com/yourusername/project6",
        demo: "https://demo6.example.com",
    },
];

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            // staggerChildren: 0.2,
            // delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Portfolio() {
    const [loading, setLoading] = useState(false);
    const [displayedProjects, setDisplayedProjects] = useState([]);
    const [currentBatch, setCurrentBatch] = useState(1);
    const projectsPerBatch = 3;
    const [terminalLines, setTerminalLines] = useState([]);

    const addTerminalLine = useCallback((line) => {
        setTerminalLines((prev) => [...prev, line]);
    }, []);

    const loadMoreProjects = async () => {
        setLoading(true);
        addTerminalLine(`$ loading batch ${currentBatch + 1}...`);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const startIndex = currentBatch * projectsPerBatch;
        const newProjects = ALL_PROJECTS.slice(startIndex, startIndex + projectsPerBatch);

        addTerminalLine(`> found ${newProjects.length} new projects`);
        setDisplayedProjects((prev) => [...prev, ...newProjects]);
        setCurrentBatch((prev) => prev + 1);
        setLoading(false);

        if (startIndex + projectsPerBatch >= ALL_PROJECTS.length) {
            addTerminalLine("> reached end of project directory");
        }
    };

    useEffect(() => {
        const initialProjects = ALL_PROJECTS.slice(0, projectsPerBatch);
        setDisplayedProjects(initialProjects);
        addTerminalLine("$ initializing portfolio...");
        addTerminalLine(`> loaded ${initialProjects.length} projects`);
    }, [addTerminalLine]);

    return (
        <div className="w-full py-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Terminal className="w-5 h-5"/>
                        <h2 className="text-3xl font-bold font-mono">./portfolio
                                                                     --list-projects</h2>
                    </div>
                    <div
                        className="flex items-center gap-2 text-zinc-400 font-mono text-sm">
                        <Folder className="w-4 h-4"/>
                        <span className="">~/projects</span>
                        <span
                            className="text-zinc-500">contains {ALL_PROJECTS.length} repositories</span>
                    </div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {displayedProjects.map((project) => (
                        <motion.div key={project.id} variants={itemVariants}>
                            <Card
                                className="border-zinc-700 py-0 hover:border-green-500 transition-all duration-300 group overflow-hidden">
                                <div className="relative">
                                    <div
                                        className="absolute top-0 left-0 right-0 bg-zinc-900 p-2 flex items-center gap-2 z-10">
                                        <div className="flex gap-1.5">
                                            <div
                                                className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div
                                                className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div
                                                className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                        <div
                                            className="text-xs font-mono text-zinc-400 truncate">
                                            ~/projects/{project.title.toLowerCase().replace(/ /g, "-")}
                                        </div>
                                    </div>
                                    <div className="relative mt-8">
                                        <img
                                            src={project.image || "/placeholder.svg"}
                                            alt={project.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div
                                            className="absolute inset-0 bg-zinc-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div
                                                className="text-green-400 font-mono text-sm p-4 text-center">
                                                <Code2
                                                    className="w-8 h-8 mx-auto mb-2"/>
                                                {project.tech.join(" • ")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-4 text-center">
                                    <h3 className="text-xl font-bold text-green-400 font-mono mb-2">{project.title}</h3>
                                    <p className="text-zinc-400 font-mono text-sm">$ {project.description}</p>
                                </CardContent>
                                <CardFooter className="p-4 pt-0 flex gap-2">
                                    <Button
                                        variant="outline"
                                        className="flex-1 text-white bg-zinc-900 border-zinc-700 hover:border-green-500 hover:text-green-400"
                                        onClick={() => window.open(project.github, "_blank")}
                                    >
                                        <Github className="w-4 h-4 mr-2"/>
                                        Source
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 text-white bg-zinc-900 border-zinc-700 hover:border-green-500 hover:text-green-400"
                                        onClick={() => window.open(project.demo, "_blank")}
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2"/>
                                        Demo
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <div
                    className="mt-8 font-mono text-sm bg-zinc-800 border border-zinc-700 rounded-lg p-4 max-h-32 overflow-y-auto">
                    {terminalLines.map((line, index) => (
                        <div key={index} className="text-green-400">
                            {line}
                        </div>
                    ))}
                </div>

                {displayedProjects.length < ALL_PROJECTS.length && (
                    <div className="mt-6 text-center">
                        <Button
                            variant="outline"
                            size="lg"
                            className="bg-zinc-800 border-zinc-700 text-white hover:border-green-500 hover:text-green-400 font-mono rounded-lg px-4 py-6 items-center"
                            onClick={loadMoreProjects}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        className="w-4 h-4 mr-2 animate-spin"/>
                                    executing load_more.sh...
                                </>
                            ) : (
                                <>
                                    <ChevronDown
                                        className="w-4 h-4 mr-2 text-white"/>
                                    ./load-more-projects
                                </>
                            )}
                        </Button>
                    </div>
                )}

                {displayedProjects.length === ALL_PROJECTS.length && (
                    <div className="mt-8 font-mono text-center rounded-lg">
                        <p className="text-green-400">
                            <span className="text-white">$</span> All projects
                                                                  loaded
                                                                  successfully
                        </p>
                        <p className="text-zinc-500 text-sm mt-2">End of project
                                                                  directory
                                                                  reached_</p>
                    </div>
                )}
            </div>
        </div>
    );
}