"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      message:
        "Halo! Saya AI Assistant yang siap membantu Anda 24/7. Ada yang bisa saya bantu?",
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  // Floating particles effect
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      }));
      setParticles(newParticles);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user",
        message: message,
        timestamp: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
      setIsTyping(true);

      // Simulasi typing delay
      setTimeout(() => {
        const responses = [
          "Terima kasih atas pertanyaan Anda! Saya akan membantu mencarikan solusi terbaik.",
          "Saya memahami kebutuhan Anda. Mari saya bantu dengan informasi yang relevan.",
          "Pertanyaan yang menarik! Berikut adalah beberapa insights yang mungkin berguna.",
          "Saya sedang menganalisis permintaan Anda dan akan memberikan rekomendasi yang tepat.",
        ];

        const botResponse = {
          id: messages.length + 2,
          type: "bot",
          message: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window dengan Glass Morphism */}
      <div
        className={cn(
          "absolute bottom-16 right-0 w-96 h-[36rem] transition-all duration-700 ease-out transform origin-bottom-right",
          "bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl",
          "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-8 pointer-events-none"
        )}
      >
        {/* Floating Particles Background */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Header dengan Gradient */}
        <div className="relative flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-t-3xl">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="w-12 h-12 border-2 border-white/30 shadow-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <AvatarFallback className="bg-transparent text-white">
                  <Bot className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full">
                <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <Sparkles className="absolute -top-1 -left-1 w-4 h-4 text-yellow-400 animate-spin" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">AI Assistant</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-white/80">Online • Siap membantu</p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-10 w-10 p-0 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6 h-80">
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-start space-x-3 animate-in slide-in-from-bottom-2 duration-500",
                  msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Avatar className="w-8 h-8 flex-shrink-0 shadow-lg">
                  <AvatarFallback
                    className={cn(
                      "text-white text-xs",
                      msg.type === "user"
                        ? "bg-gradient-to-br from-green-400 to-blue-500"
                        : "bg-gradient-to-br from-blue-500 to-purple-600"
                    )}
                  >
                    {msg.type === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "flex flex-col space-y-2 max-w-[85%]",
                    msg.type === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl",
                      msg.type === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md border border-blue-400/30"
                        : "bg-white/90 text-gray-900 rounded-bl-md border border-white/30"
                    )}
                  >
                    {msg.message}
                  </div>
                  <span className="text-xs text-white/60 px-2">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3 animate-in slide-in-from-bottom-2 duration-300">
                <Avatar className="w-8 h-8 flex-shrink-0 shadow-lg">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white/90 text-gray-900 rounded-2xl rounded-bl-md px-5 py-3 shadow-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-6 border-t border-white/10 bg-black/10 rounded-b-3xl backdrop-blur-sm">
          <div className="flex space-x-3">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tanyakan apapun pada AI..."
              className="flex-1 border-white/20 focus:border-blue-400 focus:ring-blue-400/30 rounded-xl bg-white/80 backdrop-blur-sm text-gray-900 placeholder:text-gray-500"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isTyping}
              className="px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
            >
              <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
          <div className="flex items-center justify-center mt-3 space-x-2 text-xs text-white/60">
            <Zap className="w-3 h-3" />
            <span>Powered by AI • Tekan Enter untuk kirim</span>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl transition-all duration-500 ease-out transform hover:scale-110 active:scale-95 group",
          "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600",
          "border-4 border-white/30 backdrop-blur-sm relative overflow-hidden",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000",
          isOpen ? "rotate-180" : "rotate-0"
        )}
      >
        {isOpen ? (
          <X className="h-7 w-7 text-white transition-all duration-500 group-hover:rotate-90" />
        ) : (
          <MessageCircle className="h-7 w-7 text-white transition-all duration-500 group-hover:scale-110" />
        )}

        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
      </Button>

      {/* Dynamic Notification Badge */}
      {!isOpen && (
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce shadow-lg border-2 border-white">
          <span className="relative">
            1
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
          </span>
        </div>
      )}

      {/* Ambient Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl scale-150 -z-10 animate-pulse"></div>
    </div>
  );
};

export default ChatBot;
