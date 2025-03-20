"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Terminal, Mail, Send, Github, Linkedin, Instagram, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [terminalLines, setTerminalLines] = useState([
    "$ initializing contact form...",
    "> form ready for input"
  ])

  const addTerminalLine = (line) => {
    setTerminalLines((prev) => [...prev, line])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    addTerminalLine("$ sending message...")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 1500))

    addTerminalLine("> message sent successfully")
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="w-full px-4 py-16 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-start">
            <div className="font-mono dark:text-white text-xl">
              <span className="text-green-500">&gt;_</span> /init contact.sh
              <div className="h-0.5 w-12 bg-green-500 mt-1"></div>
            </div>
          </div>
          <p className="text-zinc-950 dark:text-white font-mono mt-6 text-center">
            $ Let&apos;s collaborate on your next project
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Contact Form */}
          <Card className="bg-black border-zinc-800 overflow-hidden p-0">
            {/* Terminal Header */}
            <div className="bg-zinc-900 px-4 py-3 flex items-center">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center text-xs text-zinc-400 font-mono">
                message.txt - New Message
              </div>
            </div>

            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="font-mono text-green-500 text-sm">
                    $ input --name
                  </div>
                  <Input
                    name="name"
                    placeholder="Input your name..."
                    required
                    className="bg-zinc-800/50 border-zinc-700 focus:border-green-500 font-mono text-white"
                  />
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-green-500 text-sm">
                    $ input --email
                  </div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Input your email..."
                    required
                    className="bg-zinc-800/50 border-zinc-700 focus:border-green-500 font-mono text-white"
                  />
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-green-500 text-sm">
                    $ input --message
                  </div>
                  <Textarea
                    name="message"
                    placeholder="Your message here..."
                    required
                    className="min-h-[320px] bg-zinc-800/50 border-zinc-700 focus:border-green-500 font-mono text-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading || submitted}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-green-500 border-zinc-700 hover:border-green-500 font-mono"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : submitted ? (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Terminal */}
          <div className="space-y-6">
            {/* Email Card */}
            <Card className="bg-black border-zinc-800 overflow-hidden p-0">
              <div className="bg-zinc-900 px-4 py-3 flex items-center">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="font-mono space-y-2">
                  <div className="text-green-500 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    $ echo $CONTACT_EMAIL
                  </div>
                  <a
                    href="mailto:ginanjar.aditya@gmail.com"
                    className="text-white hover:text-green-500 transition-colors pl-6 block"
                  >
                    ginanjar.aditya@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-black border-zinc-800 overflow-hidden p-0">
              <div className="bg-zinc-900 px-4 py-3 flex items-center">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="font-mono space-y-4">
                  <div className="text-green-500">
                    $ ls social-links/
                  </div>
                  <div className="pl-6 space-y-3">
                    <a
                      href="https://github.com/kudith"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-green-500 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      kudith
                    </a>
                    <a
                      href="https://linkedin.com/in/ginanjar-aditya-priamata"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-green-500 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      Ginanjar Aditya Prianata
                    </a>
                    <a
                      href="https://instagram.com/ginanjaraditya_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-green-500 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      ginanjaraditya_
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terminal Output */}
            <Card className="bg-black border-zinc-800 overflow-hidden p-0">
              <div className="bg-zinc-900 px-4 py-3 flex items-center">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="font-mono space-y-2">
                  {terminalLines.map((line, index) => (
                    <div
                      key={index}
                      className={line.startsWith('$') ? 'text-green-500' : 'text-green-500 pl-2'}
                    >
                      {line}
                    </div>
                  ))}
                  <div className="text-green-500">
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
