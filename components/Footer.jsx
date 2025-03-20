import { Github, Linkedin, Twitter, Terminal, ChevronRight } from "lucide-react"
import Link from "next/link"

const MENU_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
]

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: Twitter,
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-400 font-mono">
              <Terminal className="w-5 h-5" />
              <span className="text-lg font-bold">~/your-name</span>
            </div>
            <p className="text-zinc-400 font-mono text-sm">
              $ echo &quot;Full-stack developer passionate about creating elegant solutions&quot;
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <div className="text-green-400 font-mono flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              Navigation
            </div>
            <nav className="grid grid-cols-2 gap-2">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-zinc-400 hover:text-green-400 transition-colors font-mono text-sm flex items-center gap-1"
                >
                  <span className="text-zinc-500">$</span>
                  {item.name.toLowerCase()}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <div className="text-green-400 font-mono flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              Connect
            </div>
            <div className="space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-green-400 transition-colors font-mono text-sm flex items-center gap-2"
                >
                  <link.icon className="w-4 h-4" />
                  {link.name.toLowerCase()}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider with ASCII Art */}
        <div className="border-t border-zinc-800 pt-8 mt-8">
          <div className="text-center text-zinc-600 font-mono text-xs mb-4">
            <pre className="overflow-x-auto">
              {`
+-+-+-+-+-+-+-+-+-+-+-+-+
|T|h|a|n|k|s||f|o|r||<|3|
+-+-+-+-+-+-+-+-+-+-+-+-+
              `.trim()}
            </pre>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center font-mono">
          <p className="text-zinc-500 text-sm">
            <span className="text-green-400">$</span> echo &quot;© {currentYear} Your Name. All rights reserved.&quot;
          </p>
          <p className="text-zinc-600 text-xs mt-2">&lt;/&gt; with ❤️ using Next.js & React</p>
        </div>
      </div>
    </footer>
  )
}

