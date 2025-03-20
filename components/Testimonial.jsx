"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Building2, User, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    message: "Exceptional problem-solving skills! Delivered a complex project ahead of schedule.",
    name: "Sarah Chen",
    company: "TechCorp Solutions",
    role: "CTO",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    message: "Very professional and efficient! The code quality exceeded our expectations.",
    name: "John Doe",
    company: "Innovation Labs",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    message: "Outstanding attention to detail and excellent communication throughout the project.",
    name: "Maria Garcia",
    company: "Digital Ventures",
    role: "Lead Developer",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    message: "Transformed our legacy system into a modern, scalable solution. Highly recommended!",
    name: "Alex Kim",
    company: "Future Systems",
    role: "Technical Director",
    avatar: "/placeholder.svg?height=200&width=200",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [typing, setTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const currentTestimonial = testimonials[currentIndex]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    setTyping(true)
    setDisplayedText("")
    let currentChar = 0
    const text = currentTestimonial.message

    const typingInterval = setInterval(() => {
      if (currentChar < text.length) {
        setDisplayedText((prev) => prev + text[currentChar])
        currentChar++
      } else {
        setTyping(false)
        clearInterval(typingInterval)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [currentIndex, currentTestimonial.message])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevTestimonial()
      } else if (e.key === "ArrowRight") {
        nextTestimonial()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="w-full px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-start">
            <div className="font-mono dark:text-white text-xl">
              <span className="text-green-500">&gt;_</span> /read testimonials.json
              <div className="h-0.5 w-12 bg-green-500 mt-1"></div>
            </div>
          </div>
          <p className="text-zinc-950 font-mono mt-6 text-center">$ Displaying client feedback from database...</p>
        </div>

        <motion.div
          className="relative mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-black border-zinc-800 overflow-hidden max-w-4xl mx-auto p-0">
            {/* Terminal Header */}
            <div className="bg-zinc-900 px-4 py-2 flex items-center">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center text-xs text-zinc-400 font-mono">
                client testimonials - {currentIndex + 1} of {testimonials.length}
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Testimonial */}
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-500 font-mono">
                      <MessageSquare className="w-5 h-5" />
                      <span>Message:</span>
                    </div>
                    <div className="font-mono text-white pl-7 leading-relaxed">
                      &quot;{displayedText}
                      {typing && <span className="animate-pulse">_</span>}&quot;
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-500 font-mono">
                      <Building2 className="w-5 h-5" />
                      <span>Organization:</span>
                    </div>
                    <div className="font-mono text-white pl-7">{currentTestimonial.company}</div>
                  </div>
                </div>

                {/* Right Column - User */}
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 text-green-500 font-mono mb-4">
                    <User className="w-5 h-5" />
                    <span>User:</span>
                  </div>

                  <motion.div
                    key={currentTestimonial.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <Avatar className="w-32 h-32 border-4 border-zinc-800 bg-zinc-200">
                      <AvatarImage src={currentTestimonial.avatar} alt={currentTestimonial.name} />
                      <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xl">
                        {currentTestimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="mt-4 text-center font-mono text-white">
                      {currentTestimonial.name} <span className="text-zinc-500">~ {currentTestimonial.role}</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="bg-transparent text-white border-zinc-700 hover:bg-zinc-800 hover:text-green-500"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="bg-transparent text-white border-zinc-700 hover:bg-zinc-800 hover:text-green-500"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Terminal Footer */}
            <div className=" px-4 py-2 text-center">
              <p className="text-green-500 text-xs font-mono">$ Press arrow keys or click buttons to navigate...</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

