"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Me", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full left-0 right-0 bg-white dark:bg-zinc-950  z-50 flex max-w-7xl mx-auto justify-between items-center p-4">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold flex items-center space-x-1">
        <span className="text-green-500">$</span>
        <span>adty</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Dark Mode Toggle & Mobile Menu */}
      <div className="flex items-center space-x-4 cursor-pointer">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={80} /> : <Moon size={80} />}
        </Button>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
