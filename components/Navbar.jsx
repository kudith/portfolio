"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Menu, Sun, Moon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Me", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full left-0 right-0 bg-white dark:bg-zinc-950 z-50 flex max-w-7xl mx-auto justify-between items-center p-4 border-b border-gray-100 dark:border-zinc-800">
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
            className={`text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition ${
              pathname === item.href ? "font-medium text-green-500 dark:text-green-400" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Dark Mode Toggle & Mobile Menu */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-[280px] p-0 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800"
            hideCloseButton={true} // Hide the default close button
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-800">
                <Link href="/" className="text-xl font-bold flex items-center space-x-1" onClick={() => setOpen(false)}>
                  <span className="text-green-500">$</span>
                  <span>adty</span>
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                  </Button>
                </SheetClose>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-auto py-6 px-4">
                <div className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-3 rounded-md text-base transition-colors
                        ${pathname === item.href 
                          ? "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 font-medium" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"}
                      `}
                      onClick={() => setOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 dark:border-zinc-800">
                <div className="flex items-center justify-center">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                    }}
                  >
                    <span className="mr-2">
                      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    </span>
                    Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
