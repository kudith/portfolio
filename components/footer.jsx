"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true, margin: "-80px" },
});

export default function Footer({
  brand = "ADTY",
  email = "ginanjar.aditya15@gmail.com",
  social = [
    { name: "github", href: "https://github.com/kudith", icon: Github },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/ginanjar-aditiya-prianata-744691242/",
      icon: Linkedin,
    },
  ],
}) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Contact from ${fromName || "Portfolio"}`;
    const bodyLines = [
      fromName ? `Name: ${fromName}` : null,
      fromEmail ? `Email: ${fromEmail}` : null,
      "",
      message || "",
    ].filter(Boolean);
    const body = bodyLines.join("\n");
    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setIsContactOpen(false);
  };

  return (
    <footer id="contact" className="relative px-6 lg:px-16 pt-28 pb-12">
      {/* Top divider with soft gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Card-like container */}
        <motion.div
          {...fadeUp(0)}
          className="relative rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur-xl"
        >
          {/* Subtle background accent */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-foreground/[0.03] via-transparent to-transparent" />

          <div className="relative z-10 p-8 md:p-12 text-left break-words">
            {/* Top: CTA */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <h4 className="text-3xl md:text-4xl font-serif font-light tracking-tight">
                  Let&apos;s build something cool
                </h4>
                <p className="text-foreground/60 leading-relaxed">
                  I&apos;m available for projects, collaborations, and
                  thoughtful conversations.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="self-start md:self-auto"
              >
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Email me</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>

            {/* Middle: links */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Brand */}
              <div className="space-y-4">
                <div className="text-lg font-serif font-bold">{brand}</div>
                <p className="text-sm text-foreground/60 max-w-xs">
                  Crafting interfaces with clarity, rhythm, and gentle motion.
                </p>
                <div className="flex items-center gap-4">
                  {social.map((s) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-2xl text-foreground/40 hover:text-foreground transition-colors"
                        aria-label={s.name}
                      >
                        <Icon className="w-5 h-5" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Menu */}
              <div className="space-y-4">
                <div className="text-sm tracking-[0.2em] uppercase text-foreground/40">
                  Navigate
                </div>
                <ul className="space-y-2">
                  {[
                    { name: "Home", href: "#home" },
                    { name: "About", href: "#about" },
                    { name: "Work", href: "#showcase" },
                    { name: "Contact", href: "#contact" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                      >
                        <span>{item.name}</span>
                        <span className="h-px w-0 bg-foreground/40 group-hover:w-8 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Meta */}
              <div className="space-y-4">
                <div className="text-sm tracking-[0.2em] uppercase text-foreground/40">
                  Details
                </div>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>
                    <span className="text-foreground/50">Location</span> ·
                    Tasikmalaya, ID
                  </li>
                  <li>
                    <span className="text-foreground/50">Status</span> ·
                    Available for projects
                  </li>
                  <li>
                    <span className="text-foreground/50">Email</span> ·{" "}
                    <span className="break-words">{email}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom: copyright */}
            <div className="mt-10 pt-6 border-t border-foreground/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-foreground/50">
              <div>
                © {new Date().getFullYear()} Ginanjar Aditya Prianata. All
                rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy
                </Link>
                <span className="text-foreground/20">/</span>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Modal */}
        {isContactOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsContactOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-lg rounded-2xl border border-foreground/10 bg-background/95 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 pb-3 border-b border-foreground/10">
                <h3 id="contact-modal-title" className="text-lg font-semibold">
                  Contact me
                </h3>
                <button
                  type="button"
                  className="p-2 rounded-md hover:bg-foreground/5"
                  onClick={() => setIsContactOpen(false)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 pt-4 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="Your name"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <textarea
                    id="contact-message"
                    placeholder="Tell me about your project..."
                    className="min-h-28 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsContactOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Send email</Button>
                </div>
                <p className="text-xs text-foreground/60 pt-1">
                  Your message will open in your email app addressed to{" "}
                  <span className="font-medium">{email}</span>.
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </footer>
  );
}
