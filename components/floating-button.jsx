"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      message:
        "Hello! I'm here to help you learn more about Aditya's work and experience. What would you like to know?",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Thank you for your interest! Aditya specializes in full-stack development with modern technologies like React, Node.js, and TypeScript.",
        "I'd be happy to help you explore Aditya's portfolio and projects in more detail. Feel free to ask about specific technologies or projects!",
        "Aditya has extensive experience in web development, from frontend interfaces to backend systems. What aspect interests you most?",
        "Currently available for new projects and collaborations. Would you like to know more about Aditya's recent work or get in touch directly?",
        "Aditya's recent projects showcase expertise in modern web frameworks, API development, and responsive design. Which area would you like to explore?",
        "Feel free to browse the portfolio sections or ask specific questions about technologies, project timelines, or collaboration opportunities!",
      ];

      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={chatRef}>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/20 backdrop-blur-sm -z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-16 right-0 w-[22rem] h-[28rem] bg-background/98 backdrop-blur-xl border border-border/60 rounded-3xl shadow-xl shadow-foreground/5 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/40 bg-background/60">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 bg-foreground rounded-full flex items-center justify-center shadow-sm">
                      <Bot className="w-4 h-4 text-background" />
                    </div>
                    <motion.div
                      className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-medium text-sm text-foreground tracking-tight">
                      AI Assistant
                    </h3>
                    <p className="text-xs text-foreground/50 font-light">
                      Always here to help
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 text-foreground/40 hover:text-foreground hover:bg-foreground/5 rounded-full transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 px-5 h-72">
                <div className="space-y-4 py-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={cn(
                        "flex gap-3",
                        msg.type === "user" ? "flex-row-reverse" : ""
                      )}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {msg.type === "user" ? (
                          <div className="w-7 h-7 bg-foreground/8 rounded-full flex items-center justify-center">
                            <User className="w-3.5 h-3.5 text-foreground/60" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 bg-foreground rounded-full flex items-center justify-center shadow-sm">
                            <Bot className="w-3.5 h-3.5 text-background" />
                          </div>
                        )}
                      </div>
                      <div
                        className={cn(
                          "max-w-[80%] space-y-1.5",
                          msg.type === "user" ? "items-end" : "items-start"
                        )}
                      >
                        <motion.div
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className={cn(
                            "px-4 py-2.5 rounded-2xl text-sm leading-relaxed font-normal",
                            msg.type === "user"
                              ? "bg-foreground text-background rounded-br-md shadow-sm"
                              : "bg-foreground/4 text-foreground rounded-bl-md border border-foreground/5"
                          )}
                        >
                          {msg.message}
                        </motion.div>
                        <div
                          className={cn(
                            "text-xs text-foreground/35 font-light tracking-wide px-1",
                            msg.type === "user" ? "text-right" : "text-left"
                          )}
                        >
                          {msg.timestamp}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-3"
                      >
                        <div className="w-7 h-7 bg-foreground rounded-full flex items-center justify-center shadow-sm mt-0.5">
                          <Bot className="w-3.5 h-3.5 text-background" />
                        </div>
                        <div className="bg-foreground/4 border border-foreground/5 rounded-2xl rounded-bl-md px-4 py-3">
                          <div className="flex gap-1.5">
                            {[0, 0.15, 0.3].map((delay, i) => (
                              <motion.div
                                key={i}
                                className="w-1.5 h-1.5 bg-foreground/50 rounded-full"
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="px-5 py-4 border-t border-border/40 bg-background/60">
                <div className="flex gap-2.5">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 border-border/30 focus:border-foreground/20 bg-background/80 text-sm placeholder:text-foreground/40 h-10 rounded-xl shadow-sm focus:shadow-md transition-shadow duration-200"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isTyping}
                    size="sm"
                    className="bg-foreground text-background hover:bg-foreground/90 px-3 h-10 rounded-xl shadow-sm disabled:opacity-40 transition-all duration-200 hover:shadow-md"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <p className="text-xs text-foreground/30 mt-2.5 text-center font-light tracking-wide">
                  Press Enter to send • Click outside to close
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
      >
        <Button
          onClick={toggleChat}
          className={cn(
            "w-14 h-14 rounded-full shadow-lg bg-foreground text-background hover:bg-foreground/95 border-0 transition-all duration-300 shadow-foreground/20 hover:shadow-foreground/30 hover:shadow-xl",
            isOpen && "ring-2 ring-foreground/20"
          )}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -45 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Notification Badge */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute -top-1.5 -right-1.5"
          >
            <div className="w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center shadow-lg relative">
              1
              <motion.div
                className="absolute inset-0 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingChatButton;
